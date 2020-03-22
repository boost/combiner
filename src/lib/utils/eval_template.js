const evalTemplate = (story, text) => {
  console.log(story);
  return text
    .replace('{story.id}', story.id)
    .replace('{story.title}', story.name)
    .replace('{story.description}', story.description)
    .replace('{story.project_id}', story.project_id)
    .replace('{story.url}', story.url)
}

export default evalTemplate;
