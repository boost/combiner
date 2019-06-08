import { enrichStory, getCurrentProject, getCurrentIteration } from 'utils';

let buildReport = async (client) => {
  const iteration = await getCurrentIteration(client);
  let result = '<ul>';
  const stories = iteration.stories.filter(story => story.current_state == 'accepted');
  for (let i = 0; i < stories.length; i++) {
    const ownersJSON = await client.storyOwners(stories[i].project_id, stories[i].id);

    const title = stories[i].name.split(':')[0];
    const owners = ownersJSON.map(owner => owner.name).join(', ');

    result += `<li>${title} (${owners})</li>`;
  }
  result += '</ul>';
  return Promise.resolve(result);
};

export { buildReport };