let buildStoryUrl = story => {
  return `https://www.pivotaltracker.com/story/show/${story.id}`
};

let buildName = story => {
  const labels = story.labels.map(label => label.name).join(', ');
  return `${story.name} [${labels}] ${buildStoryUrl(story)}`;
};

export { buildStoryUrl, buildName };