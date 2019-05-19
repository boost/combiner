import './pivotal.scss';
var $ = require('jquery');

// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
function copyToClipboard(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain", text);
        event.clipboardData.setData("text/html", html);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}

function fetchStory(storyId) {
  return fetch('https://www.pivotaltracker.com/services/v5/stories/165404870')
  .then((response) => { return response.json(); });
}

function copyTitle() {
  const storyId = $(this).attr('data-id');
  fetchStory(storyId).then((story) => {
    copyToClipboard(story.name);
  });
}

function copyR4A() {
  const storyId = $(this).attr('data-id');
  fetchStory(storyId).then((story) => {
    debugger;
    copyToClipboard(story.description);
  });
}

function runClipboard($stories) {
  $stories.each(function(index) {
    const storyId = $(this).attr('data-id');
    const storyTitle = $(this).find('span[data-aid="StoryPreviewItem__title"]').text();
    const buttonTitle = `<button data-id="${storyId}" class="copy-title">T</button>`
    const buttonR4A   = `<button data-id="${storyId}" class="copy-r4a">r4a</button>`
    $(this).find('header.preview').after(buttonTitle);
    $(this).find('header.preview').after(buttonR4A);
    $(this).find('.copy-title').click(copyTitle);
    $(this).find('.copy-r4a').click(copyR4A);
  });
}

$(function() {
  function waitStoryLoading() {
    let $stories = $('.story.model');

    if (!$stories.length) {
      return setTimeout(waitStoryLoading, 250);
    }

    runClipboard($stories);
  }
  waitStoryLoading();
});