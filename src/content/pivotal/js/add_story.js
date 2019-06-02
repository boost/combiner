import browser from 'webextension-polyfill';
import snippetInput from './utils/snippet_input';
import $ from 'jquery';

function waitForDescriptionTextarea() {
  let $textarea = $('.edit.details.new textarea[placeholder="Add a description"]');

  if (!$textarea.length) {
    setTimeout(waitForDescriptionTextarea, 250);
  }

  snippetInput($textarea, browser.i18n.getMessage('storyDescription'));
}

function waitForNewStory() {
  let $story = $('.edit.details.new');

  if (!$story.length) {
    return setTimeout(waitForNewStory, 250);
  }
  var $titleInput = $story.find('textarea[name="story[name]"]');
  const titleMessage = '[TITLE]: As [user], I want [description], so that I can [benefit].';
  snippetInput($titleInput, titleMessage);

  $story.find('div[data-aid="renderedDescription"]').click(waitForDescriptionTextarea);
}

$(function() {
  function waitForAddStoryButton() {
    let $addStoryButton = $('a[title="Add Story"]');

    if (!$addStoryButton.length) {
      return setTimeout(waitForAddStoryButton, 250);
    }

    $addStoryButton.click(waitForNewStory);
  }
  waitForAddStoryButton();
});