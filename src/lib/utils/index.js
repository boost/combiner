import browser from 'webextension-polyfill';

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

let getIterationStories = async (client, iteration) => {
  const cIteration = await client.iteration(iteration.project_id, iteration.number);
  return Promise.resolve(cIteration.stories);
};

let getUserOwnedStories = (client, project) => {
  const options = {
    'with_state': 'started'
  };
  return client.stories(project.id, options);
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

let enrichStory = async (client, story) => {
  const owners = await client.storyOwners(story.project_id, story.id);
  const memberships = await client.projectMemberships(story.project_id);

  story.owners = owners;
  story.requester = memberships.find(u => u.person.id === story.requested_by_id);
  return Promise.resolve(story);
}

let sendStoryDetails = async (client, story) => {
  const enrichedStory = await enrichStory(client, story);

  const tabs = await browser.tabs.query({active: true, currentWindow: true});
  return browser.tabs.sendMessage(tabs[0].id, story);
};

export {
  getCurrentIteration,
  getIterationStories,
  getProjects,
  getCurrentProject,
  getUserOwnedStories,
  enrichStory,
  sendStoryDetails
};