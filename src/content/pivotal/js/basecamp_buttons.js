import '../scss/pivotal.scss';
import { fetchStory, fetchProjects } from './utils/tracker_api';
import { copyToClipboard } from 'utils/clipboard';
import { buildR4ATitle, buildR4AMessage } from 'utils/basecamp';
import $ from 'jquery';

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

    const buttonTitle = $('<button>', { 'data-id': storyId, class: "copy-title", text: 'T' });
    const buttonR4A   = $('<button>', { 'data-id': storyId, class: "copy-r4a", text: 'R4A' });

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