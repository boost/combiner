import { buildStoryUrl } from 'utils/pivotal'

let buildName = story => {
  const labels = story.labels.map(label => label.name);
  const labelsStr = labels.length ? ` [${labels.join(', ')}] ` : ' ';

  return `${story.name}${labelsStr}${buildStoryUrl(story)}`;
};

export { buildName };