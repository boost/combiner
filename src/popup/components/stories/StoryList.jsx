import React, { Component } from 'react';
import { getCurrentProject, getUserOwnedStories } from 'utils';
import Story from './Story';

class StoryList extends Component {
  render() {
    return (
      <section>
        <ul className='story-list'>
          {
            this.props.stories.map(story =>
              <Story key={story.id} data={story} />
            )
          }
        </ul>
      </section>
    );
  }
}

export default StoryList;