Documentation: https://boost.github.io/combiner/

# Boost browser extension

The missing link between Harvest - PivotalTracker - Basecamp. Track your time
directly from the PivotalTracker interface and generate acceptance messages from your stories.

We use Harvest, we use PivotalTracker, we use Basecamp. We thought it would be cool to link
our Harvest timesheets directly to our PivotalTracker stories to simplify
tracking and review, and also generate ready for acceptance messages for basecamp from pivotal.

**Google Chrome and Firefox are currently the only supported browsers.**

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
- For chrome:
  - In your [Chrome extensions tab](chrome://extensions/), enable "developer mode",
    then click the "load unpacked extension..." button and select the `build/`
    directory within the location where you cloned this repository
- For firefox:
  - Run `npm run web-ext:run`
  - Wait for firefox to open with the extension loaded
- Navigate to a PivotalTracker project in your browser and voilá!

## III. Deployment

### III.1 Manual process

#### III.1.a Firefox

1. Update the CHANGELOG.md
2. Update the version in `package.json`
3. Build it: `npm run build:firefox`
4. Verify that everything is ok: `npm run web-ext:lint:firefox`
5. Zip it: `rm -f build-firefox/firefox.zip; cd build-firefox; zip -r ../build-firefox/firefox.zip *; cd ..`
6. Zip the source code: `rm -f build-firefox/source_code.zip; zip -r build-firefox/source_code.zip $(git ls-files)`
7. Go to the add-on admin page: https://addons.mozilla.org/en-US/developers/addons
8. Click on Upload New Version and follow the steps
9. Wait for the new version to be validated and deployed

#### III.1.b Chrome

1. Update the CHANGELOG.md
2. Update the version in `package.json`
3. Build it: `npm run build:chrome`
4. Verify that everything is ok: `npm run web-ext:lint:chrome`
5. Zip it: `rm -f build-chrome/chrome.zip; zip -r build-chrome/chrome.zip build-chrome`
6. Zip the source code: `rm -f build-chrome/source_code.zip; zip -r build-chrome/source_code.zip $(git ls-files)`
7. Go to the developer dashboard: https://chrome.google.com/webstore/developer/dashboard
8. Click on the application
9. Click on "Package" on the left menu
10. Click on "Upload new package"

### III.2 Automatic process

- Update the CHANGELOG.md and the version in package.json
- Create a new tag: `git tag vX.X.X`
- Push it to GitHub: `git push origin vX.X.X`
- Make sure the deployment jobs are successful in the GitHub Actions

A pipeline summary:

- Compiles the code: `npm run build:[firefox|chrome]`
- Creates a GitHub release with the compiled code as asset
- Deploys the code to firefox and chrome: `npm run deploy:[firefox|chrome]`

**Notes**

This part of the pipeline is following this blog post
[here](https://www.cnwangjie.com/blog/post/Publish-browser-extension-automatically/)

This will be where you can find the credentials (if you have access):

- [Firefox](https://addons.mozilla.org/en-US/developers/addon/api/key/)
- [Chrome](https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md)
