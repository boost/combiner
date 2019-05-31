browser.runtime.onMessage.addListener(request => {
  console.log("REQUEST:", request);
  console.log("NAME:", request.name);
  // console.log("DESCRIPTION:", request.description);
  document.getElementById('pull_request_title').value = request.name.split(':')[0];
  document.getElementById('pull_request_body').value = `Acceptance Criteria
===================

${request.description}

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
});
