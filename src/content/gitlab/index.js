import { buildTitle, buildMessage } from 'utils/pull_request';
import $ from 'jquery';
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(story => {
  $('#merge_request_title').val(buildTitle(story));
  $('#merge_request_description').val(buildMessage(story));

  // trigger a resizing of the textarea to include the whole text
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.textContent = `$('#merge_request_description').trigger('change');`;
  $('head').append(script);
});
