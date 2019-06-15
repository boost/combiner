import React, { Component } from 'react';
import StoryList from './StoryList';
import { getCurrentProject, getCurrentIteration, getIterationStories } from 'utils';
import { Accordion } from 'foundation-sites';
import $ from 'jquery';

class IterationStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stories: null
    };
  }

  async componentDidMount() {
    const project = await getCurrentProject(this.props.client);
    const iteration = await getCurrentIteration(this.props.client);
    const stories = await getIterationStories(this.props.client, iteration, project);
    this.setState({
      loading: false,
      stories: stories
    });
    new Accordion($('#stories-accordion'));
  }

  render() {
    if (this.state.loading) return (<p>Loading...</p>);

    let allStories = this.state.stories;
    const freeState = ['unstarted', 'unplanned', 'planned', 'unscheduled'];
    const stories = {
      accepted:  allStories.filter(story => story.current_state == 'accepted'),
      delivered: allStories.filter(story => story.current_state == 'delivered'),
      finished:  allStories.filter(story => story.current_state == 'finished'),
      started:   allStories.filter(story => story.current_state == 'started'),
      free:      allStories.filter(story => freeState.includes(story.current_state))
    };

    return (
      <section>
        <ul id='stories-accordion' className="accordion" data-accordion data-allow-all-closed="true">
          <li className="accordion-item" data-accordion-item>
            <a href="#" className="accordion-title">Accepted</a>

            <div className="accordion-content" data-tab-content>
              <StoryList client={this.props.client} stories={stories.accepted} />
            </div>
          </li>
          <li className="accordion-item" data-accordion-item>
            <a href="#" className="accordion-title">Delivered</a>

            <div className="accordion-content" data-tab-content>
              <StoryList client={this.props.client} stories={stories.delivered} />
            </div>
          </li>
          <li className="accordion-item" data-accordion-item>
            <a href="#" className="accordion-title">Finished</a>

            <div className="accordion-content" data-tab-content>
              <StoryList client={this.props.client} stories={stories.finished} />
            </div>
          </li>
          <li className="accordion-item" data-accordion-item>
            <a href="#" className="accordion-title">Started</a>

            <div className="accordion-content" data-tab-content>
              <StoryList client={this.props.client} stories={stories.started} />
            </div>
          </li>
          <li className="accordion-item" data-accordion-item>
            <a href="#" className="accordion-title">Free</a>

            <div className="accordion-content" data-tab-content>
              <StoryList client={this.props.client} stories={stories.free} />
            </div>
          </li>
        </ul>
      </section>
    );
  }
}

export default IterationStories;