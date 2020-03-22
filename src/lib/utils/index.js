import browser from 'webextension-polyfill';
import getTemplates from 'utils/get_templates';
import evalTemplate from 'utils/eval_template';

let getCurrentIteration = async client => {
  const project = await getCurrentProject(client);
  const value = await browser.storage.local.get('currentIteration');
  if (value.currentIteration) {
    const iteration = value.currentIteration;
    if (Date.parse(iteration.start) >= Date.now() && Date.parse(iteration.end) <= Date.now()) {
      return Promise.resolve(iteration);
    }
  }
  const iterations = await client.iterations(project.id, {scope: 'current'});
  browser.storage.local.set(iterations[0]);
  return Promise.resolve(iterations[0]);
};

let getIterationStories = async (client, iteration, project = null) => {
  const cIteration = await client.iteration(iteration.project_id, iteration.number);
  if (project) {
    await cIteration.stories.forEach(story => {
      story.project = project;
    });
  }
  return Promise.resolve(cIteration.stories);
};

let getUserOwnedStories = async (client, project) => {
  let stories = await client.stories(project.id, {with_state: 'started'});
  stories = stories.concat(await client.stories(project.id, {with_state: 'finished'}));
  await stories.forEach(story => {
    story.project = project;
  });
  return Promise.resolve(stories);
};

let getProjects = async client => {
  const value = await browser.storage.local.get('projects');
  if (value.projects) return value.projects;

  const projects = await client.projects();
  browser.storage.local.set({'projects': projects});
  return Promise.resolve(projects);
};

let getCurrentProject = async client => {
  const value = await browser.storage.local.get('currentProject');
  if (value.currentProject) {
    return Promise.resolve(value.currentProject);
  }
  const projects = await getProjects(client);
  return Promise.resolve(projects[0]);
};

/* eslint-disable require-atomic-updates */
let enrichStory = async (client, story, options) => {
  if (options.includes('owners')) {
    story.owners = await client.storyOwners(story.project_id, story.id);
  }
  if (options.includes('blockers')) {
    story.blockers = await client.storyBlockers(story.project_id, story.id);
  }
  if (options.includes('tasks')) {
    story.tasks = await client.storyTasks(story.project_id, story.id);
  }
  if (options.includes('comments')) {
    story.comments = await client.storyComments(story.project_id, story.id);
  }
  if (options.includes('project')) {
    const projects = await getProjects(client);
    story.project = projects.find(project => project.id == story.project_id);
  }
  if (options.includes('requester')) {
    const memberships = await client.projectMemberships(story.project_id);
    story.requester = memberships.find(u => u.person.id === story.requested_by_id);
  }

  return Promise.resolve(story);
};
/* eslint-enable require-atomic-updates */

let sendStoryDetails = async (client, story) => {
  const enrichedStory = await enrichStory(client, story, ['owners', 'requester']);
  const templates = await client.projectTemplates(story.project_id);

  const titleTemplate = await getTemplates(client, 'pr-title', story.project_id, browser.i18n.getMessage('prTitleTemplate'));
  const descriptionTemplate = await getTemplates(client, 'pr-description', story.project_id, browser.i18n.getMessage('prDescriptionTemplate'));

  const tabs = await browser.tabs.query({active: true, currentWindow: true});
  const tab = tabs[0];
  return browser.tabs.sendMessage(tab.id, {
    title: evalTemplate(story, titleTemplate.description),
    description: evalTemplate(story, descriptionTemplate.description)
  });
};

let buildGetUrl = (url, params) => {
  const urlParams = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return `${url}${urlParams}`;
};

export {
  getCurrentIteration,
  getIterationStories,
  getProjects,
  getCurrentProject,
  getUserOwnedStories,
  enrichStory,
  sendStoryDetails,
  buildGetUrl
};
