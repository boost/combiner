import browser from 'webextension-polyfill';
import snippetInput from './utils/snippet_input';
import $ from 'jquery';
import getTemplates from './utils/getTemplates';

let titleTemplate = '';
let descriptionTemplate = '';

const waitForDescriptionTextarea = () => {
  const $textarea = $('.edit.details.new textarea[placeholder="Add a description"]');

  if (!$textarea.length) {
    setTimeout(waitForDescriptionTextarea, 250);
  }

  snippetInput($textarea, descriptionTemplate);
  $textarea.trigger('focus');
};

const waitForNewStory = () => {
  const $story = $('.edit.details.new');

  if (!$story.length) {
    return setTimeout(waitForNewStory, 250);
  }
  const $titleInput = $story.find('textarea[name="story[name]"]');
  snippetInput($titleInput, titleTemplate);

  $story.find('div[data-aid="renderedDescription"]').click(waitForDescriptionTextarea);
};

const runAddStory = async () => {
  titleTemplate = await getTemplates(
    'pivotal-title',
    browser.i18n.getMessage('storyTitleTemplate')
  )
  titleTemplate = titleTemplate[0].description

  descriptionTemplate = await getTemplates(
    'pivotal-default-descr',
    browser.i18n.getMessage('storyDescriptionTemplate')
  )
  descriptionTemplate = descriptionTemplate[0].description
  $('[title="Add Story"]').each(function() {
    if ($(this).data('eventset') == undefined) {
      $(this).data('eventset', 'true');
      $(this).click(waitForNewStory);
    }
  });
}

export default runAddStory;
