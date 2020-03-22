import '../scss/pivotal.scss';
import $ from 'jquery';
import scrapProjectData from 'utils/scrap_project_data';

// https://fontawesome.com/icons/stopwatch?style=regular
const clockSvg = `
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="stopwatch"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    class="svg-inline--fa fa-stopwatch fa-w-14 fa-9x"
  >
    <path
      fill="currentColor"
      d="M393.9 184l22.6-22.6c4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0l-20.7 20.7c-31.1-27.5-70.4-45.9-113.8-50.8V48h28c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12H172c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h28v49.4C96.4 109.3 16 197.2 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-44.7-14.1-86.1-38.1-120zM224 464c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm12-112h-24c-6.6 0-12-5.4-12-12V204c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v136c0 6.6-5.4 12-12 12z"
      class=""
    >
    </path>
  </svg>
`

const STORY_PERMALINK = 'https://www.pivotaltracker.com/story/show/%ITEM_ID%';

const PLATFORM_CONFIG = JSON.stringify({
  applicationName: 'PivotalTracker',
  permalink: STORY_PERMALINK,
  skipStyling: true
});

let uniqueIdCounter = 0;
const uniqueId = (prefix) => {
  return `${prefix}${uniqueIdCounter += 1}`;
};

class Story {
  constructor($story) {
    this.$story = $story;
    this.id = this.findId(this.$story);
    this.project = JSON.stringify(scrapProjectData(this.$story));
    this.labels = this.parseLabelElements(this.getLabels());
    this.title = this.getTitle();
  }

  parseLabelElements($labels) {
    return $labels.map((i, el) => {
      return el.innerHTML.replace(/,\s$/, '');
    }).get().filter((v, k, arr) => {
      return k === arr.indexOf(v);
    });
  }

  harvestNote() {
    const labels = this.labels.length ? ` [${this.labels.join(', ')}]` : ''
    const link = ` ${STORY_PERMALINK.replace('%ITEM_ID%', this.id)}`;
    return this.getTitle() + labels + link;
  }

  harvestDataItem() {
    return {
      id: this.id,
      name: this.harvestNote()
    };
  }

  findId() {
    const regex = new RegExp(' story_(\\d+) ');

    return parseInt(regex.exec(this.$story.attr('class'))[1])
  }

  createHarvestElement($element, className) {
    return $element
      .attr('data-uid', uniqueId('timer_'))
      .attr('data-group', JSON.stringify(scrapProjectData(this.$story)))
      .attr('data-item', JSON.stringify(this.harvestDataItem()))
      .addClass(`harvest-timer harvest-timer--${className}`)
      .append($(clockSvg))
  }
}

class CollapsedStory extends Story {
  getLabels() {
    return this.$story.find('.label')
  }

  getTitle() {
    return this.$story.find('span.story_name').text()
  }

  insertTimer() {
    this.$story.find('span.meta').after(
      this.createHarvestElement($('<span />'), 'collapsed')
    )
  }
}

class ExpandedStory extends Story {
  getLabels() {
    return this.$story.find('[data-aid="Label__Name"]')
  }

  getTitle() {
    return this.$story.find('[name="story[name]"]').val()
  }

  insertTimer() {
    this.$story.find('.actions').append(
      this.createHarvestElement($('<button />'), 'expanded')
        .attr('title', 'Harvest timer')
        .attr('type', 'button')
        .attr('tab-index', '-1')
    );
  }
}

class StoryFactory {
  static call($story) {
    if (StoryFactory.storyIsCollapsed($story)) {
      return new CollapsedStory($story);
    } else if (StoryFactory.storyIsExpanded($story)) {
      return new ExpandedStory($story);
    }
  }

  static storyIsCollapsed($story) {
    let href = /\/(projects|workspaces)\/\d+/.test(window.location.href);
    return href && $story.has('header.preview').length;
  }

  static storyIsExpanded($story) {
    let href = /\/(projects|workspaces)\/\d+/.test(window.location.href);
    let $details = $story.has('div.edit.details');
    return href && $story.is(':not(.maximized)') && $details.length;
  }
}

const injectHarvestPlatformConfig = () => {
  return new Promise(resolve => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = `window._harvestPlatformConfig = ${PLATFORM_CONFIG}`;

    $('head').append(script);

    resolve();
  });
};

const setupTimers = () => {
  return new Promise(resolve => {
    const $stories = $('.story.model.item')
      .not(':has(.harvest-timer)')
      .not(':has(button[type="submit"])');

    $stories.each(function() {
      StoryFactory.call($(this)).insertTimer();
    });

    resolve($stories.find('.harvest-timer'));
  });
};

const loadHarvestPlatform = () => {
  let url = 'https://platform.harvestapp.com/assets/platform.js';
  return Promise.resolve($.getScript(url));
};

const setupEventProxy = () => {
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

const reinitializeTimer = (i, el) => {
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

const reinitializeTimers = () => {
  // console.log(`Reinitializing timers...`);
  return setupTimers().then(function ($timers) {
    $timers.each(reinitializeTimer);
    // console.log(`Reinitialized (${$timers.length}) timers`);
  });
};

const runHarvestButton = () => {
  console.log('run!');
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
