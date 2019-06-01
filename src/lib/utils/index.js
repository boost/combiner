import browser from 'webextension-polyfill';

let userOwnedStories = (client, project) => {
  const options = {
    'with_state': 'started'
  };
  return client.stories(project.id, options);
}

let projects = async client => {
  const value = await browser.storage.local.get('projects');
  if (value.projects !== undefined) return value.projects;

  projects = await client.projects()
  browser.storage.local.set({'projects': projects});
  return Promise.resolve(projects);
}

let currentProject = async (client, projects) => {
  const value = await browser.storage.local.get('currentProject')
  if (value.currentProject !== undefined) {
    return Promise.resolve(value.currentProject);
  }
  return Promise.resolve(projects[0]);
}

export { projects, currentProject, userOwnedStories };