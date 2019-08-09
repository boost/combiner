# Changelog

## Version 2.1.1

- New name: combiner
- New logo: `src/images/icons/`
- New repository URL: https://github.com/boost/combiner
- New branding images: `images`

## Version 2.1.0

Features:

- Sidebar and popup
	- See the story details by clicking on it
	- Change the state of the story
	- Manage activity of a story
	- Start/Stop a harvest timer
- Pivotal
	- Removed "T" and "R4A" buttons for basecamp as you can now autofill the form
	- Fixed the harvest button style
	- Fixed the harvest button in firefox
- Development
	- Add Hot Module Replacement (HMR) in development mode!

## Version 2.0.0

Features:

- Sidebar and popup
	- See your started stories
	- See the story of the current iteration
	- Choose your project in the settings
	- Enter your pivotal token in the settings
	- Copy the clipboard a "Sprint review report" (currently slow)
	- Autofill pull request in Github and Gitlab
	- Autofill ready for acceptance in basecamp
	- Shortcut to open Sidebar (Ctrl+Shift+M) or popup (Alt+Shift+M)
- Pivotal
	- Same as version 1 +
	- Autofill new story with template (title and description)
	- Pressing tab in these fields will bring you to the next placeholder
- Basecamp
	- Removed interpretation of GET parameters

## Version 1.0.0

Features:

- In Pivotal:
    - Add template for new stories in Pivotal
    - Add button to track harvest time per story
    - Add buttons for basecamp: ready for acceptance title and message
- In Basecamp:
    - Interpret GET parameters to autofill new message
