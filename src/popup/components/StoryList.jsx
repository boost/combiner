import React, { Component } from 'react';
import { userOwnedStories } from 'utils';

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
    console.log('PROJECT:', this.props.project);

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
      <div>
        <ul className='story-list'>
          {
            this.state.stories.map(story =>
              <li key={story.id}>{story.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default StoryList;