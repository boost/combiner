---
number: 3
title: Pull request templates
---
Default PR template
======================

With Combiner, you have a default pull request title and description by clicking
a single button in Combiner. Here is how:

{% include video.html url='https://www.youtube.com/embed/cuYUjfEieDU' %}

**Description**

You can fill your pull request title and description with your pivotal tracker
story information like so:

1. Go to your pull request creation form
2. Click on the Combiner extension
3. Click on the document icon
4. See the title and description filled in

The default pull request title template is only the story title.

The default pull request description template is:

```
[{story.title}]({story.url})

STORY
=====

{story.description}

WHAT WAS DONE
==============

-

SCREENSHOTS
============

```

To customize this templates, see the following section.

Overwrite the template
======================

You can customise the default template (to remove it for example) like so:

{% include video.html url='https://www.youtube.com/embed/dwTfH1i959A' %}

**Description**

You can overwrite the default title and description in your pull request.
To do it, follow these instructions:

1. Go to your pivotal tracker project
2. Click on "More" on the top nav
3. Click on "Manage Templates"
4. Create a pull request title template:
  1. Click on Add Template
  2. The template title must start with "[pr-title]"
  3. Type your template in the description
5. Create a pull request description template:
  1. Click on Add Template
  2. The template title must start with "[pr-descr]"
  3. Type your template in the description

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
