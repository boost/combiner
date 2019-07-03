const buildStoryUrl = story => {
  return `https://www.pivotaltracker.com/story/show/${story.id}`;
};

const buildPossibleOwnersList = memberships => {
  return memberships.sort((m1, m2) =>
    m1.name < m2.name
  ).filter(membership =>
    membership.role == 'member'
  ).map(membership =>
    membership.person
  );
};

const buildPossibleRequesters = memberships => {
  return buildPossibleOwnersList(memberships);
};

const buildOwnersList = (memberships, owner_ids) => {
  return buildPossibleOwnersList(memberships).filter(person =>
    owner_ids.includes(person.id)
  );
};

export {
  buildStoryUrl,
  buildOwnersList,
  buildPossibleOwnersList,
  buildPossibleRequesters
};
