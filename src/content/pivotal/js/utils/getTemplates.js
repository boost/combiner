import Pivotal from 'pivotal';
import getProjectData from './getProjectData';

const getTemplates = async (header, fallback = '') => {
  const projectId = getProjectData().id;
  const json = await new Pivotal().projectTemplates(projectId);

  const regex = new RegExp(`^\\[${header}\\] `);
  const res = json.story_templates.filter(template => template.name.match(regex));
  if (res.length > 0) return res

  return {name: 'fallback', description: fallback};
}

export default getTemplates;
