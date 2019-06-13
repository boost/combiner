import React, { Component } from 'react';
import showdown from 'showdown';

class StoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  async componentDidMount() {
    let client = this.props.client;
    let story = this.props.data;
    const memberships = await client.projectMemberships(story.project_id);

    story.tasks = await client.storyTasks(story.project_id, story.id);
    story.blockers = await client.storyBlockers(story.project_id, story.id);
    story.owners = await client.storyOwners(story.project_id, story.id);
    story.requester = memberships.find(u => u.person.id === story.requested_by_id);

    this.setState({
      ready: true,
      story: story
    })
  }

  render() {
    if (!this.state.ready) return (<p>Loading...</p>);
    const story = this.state.story;
    const converter = new showdown.Converter({simplifiedAutoLink: true});
    let description = converter.makeHtml(this.state.story.description);
    description = description ? description : 'No description';

    return (
      <li className='story story-details grid-x'>
        <p className="cell">{story.name}</p>
        <p className="story-description cell" dangerouslySetInnerHTML={{ __html: description }} />
        <p className="cell">Labels: {story.labels.map(label => label.name).join(', ')}</p>
        <p className="cell">Type: {story.story_type}</p>
        <p className="cell">Points: {story.estimate}</p>
        <p className="cell">Requester: {story.requester.person.name}</p>
        <p className="cell">Owners: {story.owners.map(owner => owner.name).join(', ')}</p>
        <p className="cell">Blockers:</p>
        <ul className="blocker-list">
          {
            story.blockers.map(blocker =>
              <li
                key={blocker.id}
                className={blocker.resolved ? 'blocker-resolved' : 'blocker-unresolved'}
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(blocker.description) }}
              />
            )
          }
        </ul>
        <p className="cell">Tasks:</p>
        <ul className="task-list">
          {story.tasks.map(task => <li key={task.id}>{task.description}</li>)}
        </ul>
        <button className="button" onClick={this.props.onCloseClick}>Close</button>
      </li>
    );
  }
}

export default StoryDetails;