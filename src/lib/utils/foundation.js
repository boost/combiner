const tabsTitleClass = (active) => {
  return `tabs-title${active ? " is-active" : ""}`;
};

const tabsPanelClass = (active) => {
  return `tabs-panel${active ? " is-active" : ""}`;
};

export { tabsTitleClass, tabsPanelClass };
