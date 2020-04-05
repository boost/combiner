# Changelog

## Version 2.3.3

Bug fix:

- the clock icon is now fixed size in pivotal

Improvements:

- Use of Travis for continuous integration and delivery

## Version 2.3.2

Bug fix:

- The first selection on snippet was not exactly selecting the placeholder
- The textarea description in pivotal is now resizing on click
- Merge/Pull requests were not using the template in pivotal
- Merge requests description in GitLab were not scrollable after fill

## Version 2.3.1

Feature:

Comments in pivotaltracker.com can now have snippets.

Bug fixes:

Basecamp can be filled with a ready for acceptance message again. This message can be templated
with a pivotal tracker template with a name starting with `[pivotal-r4a] `.

## Version 2.3.0

Features:

- Nicer clock icon in the pivotal tracker website
- It's now possible to cycle through snippets in the title and description
  of pivotaltracker.com using `tab` or `shift+tab`
- Changed the placeholders to be `<TITLE>` instead of `{TITLE}`
- A story title/description can now be templated using pivotal tracker templates
  - create a template with a name starting with `[pivotal-title] ` for a title template
  - create a template with a name starting with `[pivotal-descr] ` for a title template
- Pull requests can now be templated in pivotal tracker's templates:
	- create a template with a name starting with `[pr-title] ` for a title template
	- create a template with a name starting with `[pr-description] ` for a title description
	- in the templates description you can do `{story.title}` and it will replaced automotically
	- it's working with:
		- `{story.id}`
    - `{story.title}`
    - `{story.description}`
    - `{story.project_id}`
    - `{story.url}`

Bug fixes:

- "Add Story" working again. A JQuery selector was changed
	to work with the new DOM in pivotaltracker.com

## Version 2.2.1

Bug fix:

- The CSS file for the content script on pivotaltracker was not in the `manifest.json`

## Version 2.2.0

Features:

You can now have templates on story comments from the pivotal website. The templates must be
stored on the project here: https://www.pivotaltracker.com/projects/<your-project-id>/templates

The template name must be of this format `pivotal-r4a <your template name>` (eg: `pivotal-r4a Cloud`).

Bug fixes:

- When autofilling a merge request on GitLab, the textarea is now resizing automatically
- The button "Add story" in pivotal is now autofilling even when it was not present at first
- When autofilling the story description in pivotal, the textarea is now resizing

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
