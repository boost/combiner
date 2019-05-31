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

  return client.projects();
}

let currentProject = (client, projects) => {
  return browser.storage.local.get('currentProject')
  .then(value => {
    if (value.currentProject !== undefined) {
      return value.currentProject;
    }
    return new Promise((resolve, reject) => {
      resolve(projects[0]);
    });
  });
}

export { projects, currentProject, userOwnedStories };