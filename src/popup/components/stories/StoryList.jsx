import React, { Component } from 'react';
import { userOwnedStories } from 'utils';
import Story from './Story';

class StoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      stories: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.project == prevProps.project) return;

    userOwnedStories(this.props.client, this.props.project)
    .then(stories => {
      return this.setState({
        stories: stories,
        loading: false
      });
    });
  }

  render() {
    if (this.props.project == null) return (<div></div>);
    if (this.state.loading) return (<p>Stories loading...</p>);
    return (
      <section>
        <ul className='story-list'>
          {
            this.state.stories.map(story =>
              <Story key={story.id} data={story} />
            )
          }
        </ul>
      </section>
    );
  }
}

export default StoryList;