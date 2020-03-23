const evalTemplate = (story, text) => {
  return text
    .replace('{story.id}', story.id)
    .replace('{story.title}', story.name)
    .replace('{story.description}', story.description)
    .replace('{story.project_id}', story.project_id)
    .replace('{story.url}', story.url)
    .replace('{story.requester}', story.requester.person.name)
    .replace('{story.owners}', story.owners.map(owner => owner.name).join(', '))
}

export default evalTemplate;
