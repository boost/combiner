---
number: 2
title: Story templates
---
Default story template
======================

With Combiner, you have a default story title and description when clicking on
"Add Story" in pivotaltracker.com. You can cycle through placeholders by typing
<kbd>Tab</kbd> or <kbd>Tab+Shift</kbd>.

{% include video.html url='https://www.youtube.com/embed/EaRbQvPfMHs' %}

**Description**

By default, Combiner is creating a story template. Meaning that when you click
on "Add Story", the title and description will be prefilled with placeholders.

The placeholders are surrounded by `<>`. You can jump to the next or previous
placeholder respectively with `Tab` or `Shift+Tab`.

The default title template is:
> \<TITLE\>: As \<user\>, I want \<description\>, so that \<benefit\>

The default description template is:
> **Acceptance Criteria**
>- \<AC1\>
>
> **Notes**
> - \<NOTE1\>

If you want to overwrite the template, see the next section.

Customise the template
======================

You can change this template (to remove it for example) like so:

{% include video.html url='https://www.youtube.com/embed/8jPyKtsapJ4' %}

**Description**

If you want to overwrite the template provided by Combiner:

1. Go to your pivotal tracker project
2. Click on "More" on the top nav
3. Click on "Manage Templates"
4. Create a story title template:
  1. Click on Add Template
  2. The template title must start with "[story-title]"
  3. Type your template in the description, surround with `<>` your placeholders
5. Create a story description template:
  1. Click on Add Template
  2. The template title must start with "[story-descr]"
  3. Type your template in the description, surround with `<>` your placeholders
