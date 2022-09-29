const buildStoryUrl = (story) => {
  return `https://www.pivotaltracker.com/story/show/${story.id}`;
};

const buildPossibleOwnersList = (memberships) => {
  return memberships
    .filter((membership) => membership.role == "member")
    .map((membership) => membership.person)
    .sort((p1, p2) => p1.name > p2.name);
};

const buildPossibleRequesters = (memberships) => {
  return buildPossibleOwnersList(memberships);
};

const buildOwnersList = (memberships, owner_ids) => {
  return buildPossibleOwnersList(memberships).filter((person) =>
    owner_ids.includes(person.id)
  );
};

export {
  buildStoryUrl,
  buildOwnersList,
  buildPossibleOwnersList,
  buildPossibleRequesters,
};
