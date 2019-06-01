import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Pivotal from 'pivotal';
import StoryList from './StoryList';
import SelectProject from './SelectProject';

class OwnedStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {id: 0, name: '...'},
      projects: [{id: 0, name: '...'}]
    };

    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  handleProjectChange(project) {
    this.setState({
      project: project
    });
  }

  render() {
    return (
      <section>
        <SelectProject client={this.props.client} onProjectChange={this.handleProjectChange} />
        <StoryList client={this.props.client} project={this.state.project} />
      </section>
    );
  }
}

export default OwnedStories;