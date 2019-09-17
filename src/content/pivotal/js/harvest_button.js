import '../scss/pivotal.scss';
import $ from 'jquery';
import getProjectData from './utils/getProjectData';

const STORY_PERMALINK = 'https://www.pivotaltracker.com/story/show/%ITEM_ID%';

const PLATFORM_CONFIG = JSON.stringify({
  applicationName: 'PivotalTracker',
  permalink: STORY_PERMALINK,
  skipStyling: true
});

let uniqueIdCounter = 0;
let uniqueId = (prefix) => {
  return `${prefix}${uniqueIdCounter += 1}`;
};

/**
 *
 */

let storyTypes = [{
  name: 'collapsed',
  check: ($el) => {
    let href = /\/(projects|workspaces)\/\d+/.test(window.location.href);
    return href && $el.has('header.preview').length;
  },
  fn: ($el, setupTimer) => {
    setupTimer(
      $el,
      parseInt($el.data('id')),
      $el.find('span.story_name').text(),
      'harvest-timer-collapsed',
      $el.find('.label'),
      $el
    );
  }
},{
  name: 'expanded',
  check: ($el) => {
    let href = /\/(projects|workspaces)\/\d+/.test(window.location.href);
    let $details = $el.has('div.edit.details');
    return href && $el.is(':not(.maximized)') && $details.length;
  },
  fn: ($el, setupTimer) => {
    setupTimer(
      $el,
      parseInt($el.data('id')),
      $el.find('[name="story[name]"]').val(),
      'harvest-timer-expanded',
      $el.find('ul.selected.labels a.label'),
      $el.find('nav.edit div.actions')
    );
  }
},{
  name: 'detail',
  check: ($el) => {
    let href = /\/projects\/\d+\/stories\/\d+/.test(window.location.href);
    let $details = $el.has('div.edit.details');
    return href && $el.is('.maximized') && $details.length;
  },
  fn: ($el, setupTimer) => {
    setupTimer(
      $el,
      parseInt($el.find('.clipboard_button.id').data('clipboard-text').replace('#', '')),
      $el.find('[name="story[name]"]').val(),
      'harvest-timer-detail',
      $el.find('ul.selected.labels a.label.name'),
      $el.find('nav.edit div.actions')
    );
  }
}];

/**
 *
 */

let findStoryType = ($el) => {
  return storyTypes.filter((storyType) => {
    return storyType.check($el);
  }).shift();
};

/**
 *
 */

let parseLabelElements = ($labels) => {
  return $labels.map((i, el) => {
    return $(el).text().replace(/,\s$/, '');
  }).get().filter((v, k, arr) => {
    return k === arr.indexOf(v);
  });
};

/**
 *
 */

let injectHarvestPlatformConfig = () => {
  return new Promise(resolve => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = `window._harvestPlatformConfig = ${PLATFORM_CONFIG}`;

    $('head').append(script);

    resolve();
  });
};

/**
 *
 */

let setupTimers = () => {
  return new Promise(resolve => {
    let $stories = $('.story.model.item').not(':has(.harvest-timer)');

    $stories.each(function(i, el) {
      let $el = $(el);
      let storyType = findStoryType($el);

      if (storyType) {
        (storyType.fn || $.noop)($el, setupTimer);
      }
    });

    resolve($stories.find('.harvest-timer'));
  });
};

/**
 *
 */

let setupTimer = ($el, id, name, className, $labels, $appendTo) => {
  let data_item = {};
  let labels = parseLabelElements($labels);
  let $timer = $el.find('.harvest-timer');

  data_item.id = id;
  data_item.name = name;
  data_item.name += labels.length ? ` [${labels.join(', ')}]` : '';
  data_item.name += ` ${STORY_PERMALINK.replace('%ITEM_ID%', id)}`;

  if (!$timer.length) {
    $timer = $('<div />')
      .appendTo($appendTo)
      .addClass(`harvest-timer ${className}`)
      .attr('data-uid', uniqueId('timer_'))
      .attr('data-group', JSON.stringify(getProjectData($el)))
      .attr('data-item', JSON.stringify(data_item));
  }
};

/**
 *
 */

let loadHarvestPlatform = () => {
  let url = 'https://platform.harvestapp.com/assets/platform.js';
  return Promise.resolve($.getScript(url));
};

/**
 *
 */

let setupEventProxy = () => {
  return new Promise(resolve => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = [
      '(function(){',
      '  window.addEventListener("reinitializeTimer", function (evt) {',
      '    var target = document.querySelector("#harvest-messaging");',
      '    var query = "[data-uid=\'" + evt.detail.uid + "\']";',
      '    var timer = document.querySelector(query);',
      '    var harvest = document.querySelector("#harvest-messaging");',
      '    var data = { detail: { element: timer } };',
      '    harvest.dispatchEvent(new CustomEvent("harvest-event:timers:add", data));',
      '  });',
      '}());'
    ].join('\n');
    $('head').append(script);

    resolve();
  });
};

/**
 *
 */

let reinitializeTimer = (i, el) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.textContent = [
    'window.dispatchEvent(new CustomEvent("reinitializeTimer", {',
    '  detail: {',
    `    uid: "${el.getAttribute('data-uid')}"`,
    '  }',
    '}));',
  ].join('\n');
  $('head').append(script);
};

/**
 *
 */

let reinitializeTimers = () => {
  // console.log(`Reinitializing timers...`);
  return setupTimers().then(function ($timers) {
    $timers.each(reinitializeTimer);
    // console.log(`Reinitialized (${$timers.length}) timers`);
  });
};

/**
 *
 */

let runHarvestButton = () => {
  // console.log('run!');
  return Promise.resolve()
    // .then(console.log('Injecting Harvest Platform configuration...'))
    .then(injectHarvestPlatformConfig)
    // .then(console.log('Setting up timers...'))
    .then(setupTimers)
    // .then(console.log('Injecting Harvest Platform...'))
    .then(loadHarvestPlatform)
    // .then(console.log('Setting up event proxy...'))
    .then(setupEventProxy)
    // .then(console.log('Setting up reinitialization loop...'))
    .then(function reinitializationLoop() {
      setInterval(reinitializeTimers, 1000);
    }).catch(console.error);
};


export default runHarvestButton;
