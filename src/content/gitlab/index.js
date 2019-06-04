import { buildTitle, buildMessage } from 'utils/pull_request';

console.log('READY');

browser.runtime.onMessage.addListener(story => {
  console.log('received');
  document.getElementById('merge_request_title').value = buildTitle(story);
  document.getElementById('merge_request_description').value = buildMessage(story);
});
