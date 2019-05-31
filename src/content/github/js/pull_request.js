import { $ } from 'jquery';

console.log('HEEEEERREEE');

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the browser action script:", request.name);
  $('input#pull_request_title').val(request.name);
  console.log('after val')
});
