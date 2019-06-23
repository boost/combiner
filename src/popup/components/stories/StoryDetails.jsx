import React, { Component } from 'react';
import showdown from 'showdown';
import { enrichStory } from 'utils';
import TextareaAutosize from 'react-textarea-autosize';

class StoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  async componentDidMount() {
    const story = await enrichStory(
      this.props.client,
      this.props.data,
      ['tasks', 'blockers', 'owners', 'requester']
    );
    const labels = this.props.client.projectLabels(story.project_id);

    this.setState({
      ready: true,
      labels: labels,
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