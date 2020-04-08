---
number: 4
title: Ready for acceptance messages templated
---
You are always writing the same text to describe what you have done on the
story? Ready for acceptance templating is a solution to make the writing
of these messages faster.

On PivotalTracker
=================

{% include video.html url='https://www.youtube.com/embed/6AN3Rgd6hT8' %}

**Description**

1. Combiner adds the same icon under the comment textarea as the description
2. By default, clicking on it won't show anything
3. If you want to add a templates:
  1. Click "More" in the top menu of your pivotal tracker project
  2. Click on "Manage templates"
  3. Click on "Add template"
  4. Create a template with this format: `[pivotal-r4a] Name of your template`
  5. Example `[pivotal-r4a] Cloud`
  6. You can create multiple ones with different names
4. Go back to a story comment textarea
5. Click on template icon and see your templates name showing up

On BaseCamp
===========

Default template
----------------

{% include video.html url='https://www.youtube.com/embed/tbJRCVCE4D4' %}

**Description**

1. Go to your project on [basecamp.com](basecamp.com)
2. Click on "New message"
3. Click on the Combiner extension
4. Choose a story and click on the "document" icon
5. See the basecamp message title and description filled with story data.

The default message title is

> R4A: {story.title}

The default message description is:

> Hi {story.requester},
>
> <br />
> The story [{story.title}]({story.url}) is ready for acceptance.
>
> <br />
> **What was done**
>
> N/A
>
> <br />
> **How to test**
>
> N/A
>
> <br />
> **Pull requests**
>
> N/A
>
> <br />
> **Story size changed**
>
> N/A
>
> <br />
> Thanks,
>
> {story.owners}.

Customise the template
----------------------

{% include video.html url='https://www.youtube.com/embed/pKkn5KJsVEE' %}

**Description**

You can overwrite the default title and description in your basecamp messages.
To do it, follow these instructions:

1. Go to your pivotal tracker project
2. Click on "More" on the top nav
3. Click on "Manage Templates"
4. Create a basecamp title template:
  1. Click on Add Template
  2. The template title must start with "[r4a-title]"
  3. Type your template in the description
5. Create a basecamp description template:
  1. Click on Add Template
  2. The template title must start with "[r4a-description]"
  3. Type your template in the description

The syntax here is markdown and it will be converted in a BaseCamp suitable
format. You can use the template preview. **Pro tip:** If you want to add
extra spaces between paragraphs, you can add the HTML tag `<br />`.

Content will be parserd by Combiner, to be replaced by the story information.
Here are the possible replacements:

- `{story.id}`
- `{story.title}`
- `{story.description}`
- `{story.project_id}`
- `{story.url}`
- `{story.requester}`
- `{story.owners}` will be replaced by story owners full names separated by
commas
- More to come...
