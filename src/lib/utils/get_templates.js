const getTemplates = async (
  client,
  header,
  project_id,
  fallback = "",
  first = true
) => {
  const json = await client.projectTemplates(project_id);

  const regex = new RegExp(`^\\[${header}\\] `);
  const res = json.story_templates.filter((template) =>
    template.name.match(regex)
  );
  if (res.length > 0 && first) return res[0];
  if (res.length > 0) return res;

  return { name: "fallback", description: fallback };
};

export default getTemplates;
