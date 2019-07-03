import { buildTitle, buildMessage } from 'utils/pull_request';
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(story => {
  document.getElementById('pull_request_title').value = buildTitle(story);
  document.getElementById('pull_request_body').value = buildMessage(story);
});
