import $ from 'jquery';
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(pull_request => {
  // github
  $('#pull_request_title').val(pull_request.title);
  $('#pull_request_body').val(pull_request.description)

  // gitlab
  $('#merge_request_title').val(pull_request.title);
  $('#merge_request_description').val(pull_request.description)

  if ($('#merge_request_description').length) {
    // trigger a resizing of the textarea to include the whole text
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = `$('#merge_request_description').trigger('change');`;
    $('head').append(script);
  }
});
