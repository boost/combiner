import showdown from 'showdown';

let buildTitle = story => {
  return `R4A: ${story.name.split(':')[0]}`;
}

let buildMessage = story => {
  const storyId = story.id;
  // const requester = story.requester.name;
  const requester = '';
  const description = new showdown.Converter().makeHtml(story.description);
  // const owners = story.owners.map((owner) => owner.name).join(', ');
  const owners = '';

  return `
    <p>Hi ${requester},</p>
    <p>
      This <a href="{story.url}">story</a> is ready for acceptance.
    </p>
    <br />
    <p>
      ${description}
    </p>
    <br />
    <p>
      <strong>What was done</strong>
    </p>
    <p>N/A</p>
    <br />
    <p>
      <strong>How to test</strong>
    </p>
    <p>N/A</p>
    <br />
    <p>
      <strong>Documentation</strong>
    </p>
    <p>Cloud story? Did you update the spreadsheet? :D</p>
    <p>N/A</p>
    <br />
    <p>
      <strong>Code reviewed by</strong>
    </p>
    <p>N/A</p>
    <br />
    <p>
      <strong>Story size changed</strong>
    </p>
    <p>N/A</p>
    <br />
    <p>Thanks</p>
    <p>${owners}</p>`;
}

export { buildTitle, buildMessage };