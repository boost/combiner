let buildTitle = story => {
  return story.name.split(':')[0];
};

let buildMessage = story => {
  return `Acceptance Criteria
===================

${story.description}

Background
==========

Checklist
=========

- [ ] Code is understandable without Dev
- [ ] Acceptance criteria, what was changed, and why it was changed (If applicable) on Pull / Merge Request
- [ ] Code Coverage goes up
- [ ] All new methods have a relevant spec
- [ ] Methods have a single responsibility (Where applicable)
- [ ] Builds Pass
- [ ] ‘Yard’ style comments on methods and classes (Where applicable)
`;
};

export { buildTitle, buildMessage };
