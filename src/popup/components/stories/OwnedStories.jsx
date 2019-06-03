import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Pivotal from 'pivotal';
import StoryList from './StoryList';
import { getCurrentProject, getUserOwnedStories } from 'utils';

class OwnedStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      stories: null
    };
  }

  async componentDidMount() {
    const project = await getCurrentProject(this.props.client);
    const stories = await getUserOwnedStories(this.props.client, project);
    this.setState({
      stories: stories,
      loading: false
    });
  }

  render() {
    if (this.state.loading) return (<p>Stories Loading...</p>);
    return (
      <section>
        <StoryList client={this.props.client} stories={this.state.stories} />
      </section>
    );
  }
}

export default OwnedStories;