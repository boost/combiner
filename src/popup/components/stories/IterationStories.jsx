import React, { Component } from 'react';
import { getCurrentProject, getCurrentIteration, getIterationStories } from 'utils';

class PivotalStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      iteration: null,
      stories: null
    };
  }

  async componentDidMount() {
    const iteration = await getCurrentIteration(this.props.client);
    const stories = await getIterationStories(this.props.client, iteration);
    this.setState({
      loading: false,
      iteration: iteration,
      stories: stories
    });
  }

  render() {
    if (this.state.loading) return (<p>Loading...</p>);
    return (<section>Stories</section>);
  }
}

export default PivotalStories;