import './pivotal.scss';

var $ = require('jquery');

const STORY_PERMALINK = 'https://www.pivotaltracker.com/story/show/%ITEM_ID%';

const PLATFORM_CONFIG = JSON.stringify({
  applicationName: 'PivotalTracker',
  permalink: STORY_PERMALINK,
  skipStyling: true
});

let uniqueIdCounter = 0;
let uniqueId = (prefix) => {
  return `${prefix}${uniqueIdCounter += 1}`
};

/**
 *
 */

let getProjectData = ($el) => {
  var $header;

  if (/\/workspaces\/\d+\/?$/.test(window.location.href)) {
    $header = $el.parents('.panel').find('.panel_header_container');
    return {
      id: parseInt($header.find('.panel_header a.velocity').attr('data-project-id')),
      name: $header.find('.workspace_header h3').text()
    };
  } else {
    return {
      id: parseInt(window.location.pathname.match(/projects\/(\d+)/)[1]),
      name: $('.raw_context_name').eq(0).text()
    };
  }
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
    return $(el).text().replace(/\,\s$/, '');
  }).get().filter((v, k, arr) => {
    return k === arr.indexOf(v);
  });
};

/**
 *
 */

let injectHarvestPlatformConfig = () => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = `window._harvestPlatformConfig = ${PLATFORM_CONFIG}`;

    let entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);

    resolve();
  });
};

/**
 *
 */

let setupTimers = () => {
  return new Promise((resolve, reject) => {
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
  let data = {};
  let labels = parseLabelElements($labels);
  let $timer = $el.find('.harvest-timer');

  data.id = id;
  data.name = name;
  data.name += labels.length ? ` [${labels.join(', ')}]` : '';
  data.name += ` ${STORY_PERMALINK.replace('%ITEM_ID%', id)}`;

  if (!$timer.length) {
    $timer = $('<div />')
      .appendTo($appendTo)
      .addClass(`harvest-timer ${className}`)
      .attr('data-uid', uniqueId('timer_'))
      .attr('data-project', JSON.stringify(getProjectData($el)))
      .attr('data-item', JSON.stringify(data));
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
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    let fn = [
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

    script.textContent = fn;
    (document.head || document.documentElement).appendChild(script);
    resolve();
  });
};

/**
 *
 */

let reinitializeTimer = (i, el) => {
  window.dispatchEvent(new CustomEvent('reinitializeTimer', {
    detail: {
      uid: $(el).data('uid')
    }
  }));
};

/**
 *
 */

let reinitializeTimers = () => {
  console.log(`Reinitializing timers...`);
  return setupTimers().then(function ($timers) {
    $timers.each(reinitializeTimer);
    console.log(`Reinitialized (${$timers.length}) timers`);
  });
};

/**
 *
 */

let run = () => {
  console.log('run!');
  return Promise.resolve()
    .then(console.log('Injecting Harvest Platform configuration...'))
    .then(injectHarvestPlatformConfig)
    .then(console.log('Setting up timers...'))
    .then(setupTimers)
    .then(console.log('Injecting Harvest Platform...'))
    .then(loadHarvestPlatform)
    .then(console.log('Setting up event proxy...'))
    .then(setupEventProxy)
    .then(console.log('Setting up reinitialization loop...'))
    .then(function reinitializationLoop() {
      setInterval(reinitializeTimers, 1000);
    }).catch(console.error);
};

/**
 *
 */

$(function() {
  function waitForStoriesThenRun() {
    let $stories = $('.story.model');

    if (!$stories.length) {
      console.log('Waiting for stories...');
      return setTimeout(waitForStoriesThenRun, 250);
    }

    console.log(`Found ${$stories.length} stories...`, );
    run();
  }
  waitForStoriesThenRun();
});
