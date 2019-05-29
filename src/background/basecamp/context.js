/**
 * Work in progress
 *
 * Basecamp doesn't allow to interact with the message body
 * by using http://wysihtml.com/
 */
import browser from 'webextension-polyfill';

function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create({
  id: "insert-r4a",
  title: browser.i18n.getMessage("insertR4A"),
  contexts: ["editable"],
  documentUrlPatterns: ["https://basecamp.com/*/projects/*/messages/new"]
}, onCreated);

let insertR4A = (info, tab) => {
  console.log('insertR4A');
  let code = [
    `textarea = browser.menus.getTargetElement(${info.targetElementId});`,
    `textarea.value = '${browser.i18n.getMessage("r4a")}';`
  ].join('\n');
  browser.tabs.executeScript(tab.id, {
    frameId: info.frameId,
    code: code
  });
};


browser.menus.onClicked.addListener((info, tab) => {
  switch(info.menuItemId) {
    case 'insert-r4a':
      insertR4A(info, tab);
    break;
  }
});
