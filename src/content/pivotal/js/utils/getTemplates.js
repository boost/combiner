import Pivotal from 'pivotal';
import getProjectData from './getProjectData';

const getTemplates = async (header) => {
  const projectId = getProjectData().id;
  const json = await new Pivotal().projectTemplates(projectId);

  const regex = new RegExp(`^\\[${header}\\] `);
  console.log(json.story_templates.map(t => t.name));
  console.log(json.story_templates.filter(template => template.name.match(regex)))
  return json.story_templates.filter(template => template.name.match(regex));
}

export default getTemplates;
