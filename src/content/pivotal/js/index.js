import $ from 'jquery';
import runAddStory from './add_story';
import runCommentTemplate from './comment_template';
import runHarvestButton from './harvest_button';

let waitForStoriesThenRun = () => {
  let $stories = $('.story.model');

  if (!$stories.length) {
    return setTimeout(waitForStoriesThenRun, 250);
  }

  runHarvestButton();
  runCommentTemplate();
  runAddStory();
}

$(function() {
  waitForStoriesThenRun();
});
