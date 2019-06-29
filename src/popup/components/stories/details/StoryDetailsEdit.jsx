import React, { Component } from 'react';
import { enrichStory } from 'utils';
import bindAll from 'lodash/bindAll';
import Details from './Details';
import Activity from './Activity';
import Code from './Code';
import Tasks from './Tasks';
import Labels from './Labels';
import Description from './Description';
import Blockers from './Blockers';

class StoryDetailsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      projectLabels: [],
      story: null,
      writeCommentActive: true,
      comment: ''
    };
  }

  async componentDidMount() {
    const story = await enrichStory(
      this.props.client,
      this.props.story,
      ['tasks', 'blockers', 'owners', 'requester', 'comments']
    );
    const projectLabels = await this.props.client.projectLabels(this.props.story.project_id);
    const memberships = await this.props.client.projectMemberships(this.props.story.project_id);

    this.setState({
      ready: true,
      projectLabels: projectLabels,
      memberships: memberships,
      story: story
    });
  }

  render() {
    if (!this.state.ready) return (<p>Loading...</p>);

    return (
      <li className="story expanded">
        <Details     client={this.props.client} story={this.state.story} memberships={this.state.memberships} onCloseClick={this.props.onCloseClick} />
        <Blockers    client={this.props.client} story={this.state.story} />
        <Description client={this.props.client} story={this.state.story} />
        <Labels      client={this.props.client} story={this.state.story} />
        <Code        client={this.props.client} story={this.state.story} />
        <Tasks       client={this.props.client} story={this.state.story} />
        <Activity    client={this.props.client} story={this.state.story} memberships={this.state.memberships} />
      </li>
    );
  }
}

export default StoryDetailsEdit;
