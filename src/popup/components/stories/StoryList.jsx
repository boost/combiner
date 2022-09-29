import React, { Component } from "react";
import PropTypes from "prop-types";
import Pivotal from "pivotal";
import Story from "./Story";

class StoryList extends Component {
  render() {
    return (
      <section>
        <ul className="story-list">
          {this.props.stories.map((story) => (
            <Story key={story.id} client={this.props.client} data={story} />
          ))}
        </ul>
      </section>
    );
  }
}

StoryList.propTypes = {
  stories: PropTypes.array,
  client: PropTypes.instanceOf(Pivotal),
};

export default StoryList;
