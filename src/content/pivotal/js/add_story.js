import browser from 'webextension-polyfill';
import snippetInput from './utils/snippet_input';
import $ from 'jquery';

const waitForDescriptionTextarea = () => {
  const $textarea = $('.edit.details.new textarea[placeholder="Add a description"]');

  if (!$textarea.length) {
    setTimeout(waitForDescriptionTextarea, 250);
  }

  snippetInput($textarea, browser.i18n.getMessage('storyDescriptionTemplate'));
  $textarea.trigger('focus');
};

const waitForNewStory = () => {
  const $story = $('.edit.details.new');

  if (!$story.length) {
    return setTimeout(waitForNewStory, 250);
  }
  const $titleInput = $story.find('textarea[name="story[name]"]');
  const titleMessage = browser.i18n.getMessage('storyTitleTemplate');
  snippetInput($titleInput, titleMessage);

  $story.find('div[data-aid="renderedDescription"]').click(waitForDescriptionTextarea);
};

const runAddStory = () => {
  $('[title="Add Story"]').each(function() {
    if ($(this).data('eventset') == undefined) {
      $(this).data('eventset', 'true');
      $(this).click(waitForNewStory);
    }
  });
}

export default runAddStory;
