var $ = require('jquery');

function waitForDescriptionTextarea() {
  let $textarea = $('.edit.details.new textarea[placeholder="Add a description"]');

  if (!$textarea.length) {
    setTimeout(waitForDescriptionTextarea, 250);
  }

  $textarea.val(browser.i18n.getMessage('storyDescription'));
}

function waitForNewStory() {
  let $story = $('.edit.details.new');

  if (!$story.length) {
    return setTimeout(waitForNewStory, 250);
  }
  $story.find('textarea[name="story[name]"]').val('As ... so that I can');
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