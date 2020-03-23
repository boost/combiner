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

To contribute to this repository and being able to test your feature, you must have an account on [Pivotal tracker](https://www.pivotaltracker.com).

Optionally, for testing some features, you will need an account on:

- [GitLab](https://gitlab.com/)
- [GitHub](https://github.com/)
- [Harvest](https://harvestapp.com)
- [Basecamp](https://basecamp.com/)

### II.1 Development

- Clone this repository and `cd` into it
- Run `npm run watch:firefox` or `npm run watch:chrome` to get the HMR
- In your Chrome extensions tab, enable "developer mode", then click the
  "load unpacked extension..." button and select the `build/` directory within
  the location where you cloned this repository
- Navigate to a PivotalTracker project in your browser and voilá!

## III. Deployment

### III.1 Firefox

1. Update the CHANGELOG.md
2. Update the version in `package.json`
3. Build it: `npm run build:firefox`
4. Verify that everything is ok: `npm run web-ext:lint`
5. Zip it: `cd build; zip -r ../dist/firefox.zip *; cd ..`
  - Chrome:
6. Zip the source code: `zip -r source_code.zip $(git ls-files)`
7. Go to the add-on admin page: https://addons.mozilla.org/en-US/developers/addons
8. Click on Upload New Version and follow the steps
9. Wait for the new version to be validated and deployed

### III.1 Chrome

1. Update the CHANGELOG.md
2. Update the version in `package.json`
3. Build it: `npm run build:chrome`
4. Verify that everything is ok: `npm run web-ext:lint`
5. Zip it: `zip -r dist/chrome.zip build`
6. Zip the source code: `zip -r $(git ls-files)`
7. Go to the developer dashboard: https://chrome.google.com/webstore/developer/dashboard
8. Click on the application
8. Click on "Package" on the left menu
9. Click on "Upload new package"
