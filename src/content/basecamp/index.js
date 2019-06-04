import browser from 'webextension-polyfill';
import { buildTitle, buildMessage } from 'utils/basecamp';

browser.runtime.onMessage.addListener(story => {
  let myFrame = document.getElementsByClassName('wysihtml5-sandbox')[0];
  let myField = myFrame.contentDocument.getElementsByTagName('body')[0];

  document.getElementById('message_subject').value = buildTitle(story);
  myField.innerHTML = buildMessage(story);
});
