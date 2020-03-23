import $ from 'jquery';
import browser from 'webextension-polyfill';
import Pivotal from 'pivotal';
import scrapProjectData from 'utils/scrap_project_data';
import getTemplates from 'utils/get_templates';
import snippetInput from 'utils/snippet_input';

let templates = [];

const extractDropdown = () => {
  const $attachment = $('[data-aid="attachmentDropdownButton"]').first();
  // hide the div to avoid the page to scroll when triggering the click
  $attachment.parents('span[data-aid="CommentEditToolbar__container"]').toggle();

  // get the dropdown
  $attachment.trigger('click');
  const $dropdown = $attachment.parent('a').find('[data-aid="attachmentDropdownButton--dropDownMenuWrapper"]').clone();
  $attachment.trigger('click');


  $attachment.parents('span[data-aid="CommentEditToolbar__container"]').toggle();
  return $dropdown;
}

const appendDropdown = ($element, $dropdown) => {
  $element.append($dropdown);
  $dropdown.toggle();
  $element.click((event) => { event.preventDefault(); $dropdown.toggle(); });
};

const setupDropdown = ($dropdown, $textarea) => {
  $dropdown.find('li:first span').text('Templates');
  const $templateElement = $dropdown.find('li').last().clone();
  $dropdown.find('li').last().remove();
  $dropdown.find('li').last().remove();

  for (let i = 0; i < templates.length; i++) {
    const templateName = templates[i].name.replace('[pivotal-r4a] ', '').trim();
    const $currentTemplateElement = $templateElement.clone();
    $currentTemplateElement.find('span').text(templateName);
    $currentTemplateElement.find('span').attr('data-index', i);
    $currentTemplateElement.attr('data-aid', `Template ${templateName}`);
    $currentTemplateElement.attr('data-index', i);

    $dropdown.find('ul').append($currentTemplateElement);
    $currentTemplateElement.click((event) => {
      event.preventDefault();

      const templateIndex = parseInt(event.target.getAttribute('data-index'));
      snippetInput($textarea, templates[templateIndex].description)
      $textarea.focus();
    });
  }
};

const insertTemplateButton = ($spanButtons) => {
  const $templateDiv = $spanButtons.find('> div').first().clone().appendTo($spanButtons);
  $templateDiv.find('button').attr('data-aid', 'template');
  $templateDiv.find('[data-aid="template"] span').attr('style', 'background: url("//assets.pivotaltracker.com/next/assets/next/b202db4f-story-templates.svg") center center no-repeat;');
  $templateDiv.find('[data-aid="template"] span').attr('title', 'Insert the ready for acceptance template in the comment');

  return $templateDiv;
}

const initCommentTemplate = () => {
  const $spanButtons = $('span[data-aid="CommentEditToolbar__container"]');
  if ($spanButtons.length == 0) return;
  if ($spanButtons.find('button[data-aid="template"]').length > 0) return;

  const $templateDiv = insertTemplateButton($spanButtons);
  const $dropdown = extractDropdown();
  appendDropdown($templateDiv, $dropdown);
  setupDropdown($dropdown, $spanButtons.parents('[data-aid="comment-new"]').find('textarea'));

  $spanButtons.parents('[data-aid="StoryDetailsEdit"]').find('textarea[aria-label="story title"]').focus();
};

const runCommentTemplate = async () => {
  const projectId = scrapProjectData().id;
  templates = await getTemplates(new Pivotal(), 'pivotal-r4a', projectId, '', false);
  setInterval(initCommentTemplate, 1000);
};

export default runCommentTemplate;
