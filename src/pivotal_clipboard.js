import './pivotal.scss';
import { fetchStory, fetchProjects } from './pivotal_tracker';
import copyToClipboard from './clipboard';
import { buildTitle, buildR4A } from './pivotal_basecamp';
var $ = require('jquery');

function copyTitle() {
  const storyId = $(this).attr('data-id');
  fetchStory(storyId).then((story) => {
    copyToClipboard(`R4A: ${story.name.split(':')[0]}`);
  });
}

function copyR4A() {
  const storyId = $(this).attr('data-id');
  fetchStory(storyId).then((story) => {
    copyToClipboard(null, buildR4A(story));
  });
}

function runClipboard($stories) {
  $stories.each(function(index) {
    const storyId = $(this).attr('data-id');

    const buttonTitle = `<button data-id="${storyId}" class="copy-title">T</button>`
    const buttonR4A   = `<button data-id="${storyId}" class="copy-r4a">R4A</button>`

    $(this).find('span.meta').before(buttonTitle);
    $(this).find('span.meta').before(buttonR4A);

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