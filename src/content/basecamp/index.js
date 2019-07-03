import { buildTitle, buildMessage } from 'utils/basecamp';
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(story => {
  let iframe = document.getElementsByClassName('wysihtml5-sandbox')[0];
  let frameBody = iframe.contentDocument.getElementsByTagName('body')[0];

  document.getElementById('message_subject').value = buildTitle(story);
  frameBody.innerHTML = buildMessage(story);

  frameBody.classList.remove('placeholder');
});
