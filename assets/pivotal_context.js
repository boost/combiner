function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create({
  id: "insert-ac",
  title: browser.i18n.getMessage("insertAC"),
  contexts: ["editable"],
  documentUrlPatterns: ["https://www.pivotaltracker.com/*"]
}, onCreated);

let insertAC = (info, tab) => {
  console.log('insertAC');
  let code = [
    `textarea = browser.menus.getTargetElement(${info.targetElementId});`,
    `textarea.value = '${browser.i18n.getMessage("storyDescription")}';`
  ].join('\n');
  browser.tabs.executeScript(tab.id, {
    frameId: info.frameId,
    code: code,
  });
}

browser.menus.onClicked.addListener((info, tab) => {
  switch(info.menuItemId) {
    case 'insert-ac':
      insertAC(info, tab);
    break;
  }
});
