import './pivotal.scss';
const Clipboard = require('clipboard');
var $ = require('jquery');


function runClipboard($stories) {
  $stories.each(function(index) {
    const storyTitle = $(this).find('span[data-aid="StoryPreviewItem__title"]').text();
    const button = `<button class="copy-title" data-clipboard-text="${storyTitle}">Copy title</button>`
    $(this).find('header.preview').after(button);
    new Clipboard('.copy-title');
  });
}

$(function() {
  function waitStoryLoading() {
    let $stories = $('.story.model');

    if (!$stories.length) {
      console.log('waitStoryLoading');
      return setTimeout(waitStoryLoading, 250);
    }

    console.log('runClipboard');
    runClipboard($stories);
  }
  waitStoryLoading();
});