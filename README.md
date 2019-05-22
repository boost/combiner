# Boost browser extension

The missing link between Harvest - PivotalTracker - Basecamp track your time
directly from the PivotalTracker interface and generate acceptance messages from your stories.

We use Harvest, we use PivotalTracker, we use Basecamp. We thought it would be cool to link up
our Harvest timesheets directly to our PivotalTracker stories to simplify
tracking and review, and also generate ready for acceptance messages for basecamp from pivotal.

> Google Chrome and Firefox are currently the only supported browsers.

## I. Installation

### I. Chrome

Visit the [Chrome Webstore](https://chrome.google.com/webstore) to install the
latest version on your browser.

### I.2 Firefox

Visit the [Firefox add-ons](https://addons.mozilla.org/) website
to install the latest version on your browser.

## II. Contribution

To contribute to this repository, you should have an account on:

- [Harvest](https://harvestapp.com)
- [Pivotal tracker](https://www.pivotaltracker.com)
- [Basecamp](https://basecamp.com/)

### II.1 Development on Chrome

- Clone this repository and `cd` into it
- Run `npm run watch` to get the
- In your Chrome extensions tab, enable "developer mode", then click the
  "load unpacked extension..." button and select the `dist/` directory within
  the location where you cloned this repository
- Navigate to a PivotalTracker project in your browser and voilá!

### II.2 Development on Firefox

- Clone this repository and `cd` into it
- Run `npm install` to get the dependencies
- Run `npm run watch` to clean, copy, webpack, and watch
- Run `npm run web-ext` to reload the extension every time the `dist` folder changes.
- Navigate to a PivotalTracker project in your browser and voilá!
