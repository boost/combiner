import $ from 'jquery';
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(pull_request => {
  // github
  if ($('#pull_request_title').length) {
    $('#pull_request_title').val(pull_request.title);
    $('#pull_request_body').val(pull_request.description)
  }

  // gitlab
  if ($('#merge_request_title').length) {
    $('#merge_request_title').val(pull_request.title);
    $('#merge_request_description').val(pull_request.description)

    // https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    $('#merge_request_description')[0].dispatchEvent(evt);
  }
});
