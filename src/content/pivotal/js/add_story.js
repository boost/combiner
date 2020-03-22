import browser from 'webextension-polyfill';
import snippetInput from 'utils/snippet_input';
import $ from 'jquery';
import getTemplates from 'utils/get_templates';
import scrapProjectData from 'utils/scrap_project_data';
import Pivotal from 'pivotal';

let titleTemplate = {};
let descriptionTemplate = {};

const waitForDescriptionTextarea = () => {
  const $textarea = $('.edit.details.new .description textarea');

  if (!$textarea.length) return setTimeout(waitForDescriptionTextarea, 250);

  snippetInput($textarea, descriptionTemplate.description, false);
};

const waitForNewStory = () => {
  const $story = $('.edit.details.new');

  if (!$story.length) return setTimeout(waitForNewStory, 250);

  const $titleInput = $story.find('textarea[name="story[name]"]');
  snippetInput($titleInput, titleTemplate.description);

  $story.find('div[data-aid="renderedDescription"]').click(waitForDescriptionTextarea);
};

const runAddStory = async () => {
  const projectId = scrapProjectData().id;
  titleTemplate = await getTemplates(
    new Pivotal(), 'pivotal-title', projectId,
    browser.i18n.getMessage('storyTitleTemplate')
  )
  descriptionTemplate = await getTemplates(
    new Pivotal(), 'pivotal-default-descr', projectId,
    browser.i18n.getMessage('storyDescriptionTemplate')
  )
  $('[title="Add Story"]').each(function() {
    if ($(this).data('eventset') == undefined) {
      $(this).data('eventset', 'true');
      $(this).click(waitForNewStory);
    }
  });
}

export default runAddStory;
