import React, { Component } from "react";
import PropTypes from "prop-types";
import Pivotal from "pivotal";
import StoryList from "./StoryList";
import { getCurrentProject, getUserOwnedStories } from "utils";

class OwnedStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      stories: null,
    };
  }

  async componentDidMount() {
    const project = await getCurrentProject(this.props.client);
    const stories = await getUserOwnedStories(this.props.client, project);
    const me = await this.props.client.me();
    this.setState({
      stories: stories.filter((story) => story.owner_ids.includes(me.id)),
      loading: false,
    });
  }

  render() {
    if (this.state.loading) return <p>Stories Loading...</p>;
    return (
      <section>
        <StoryList client={this.props.client} stories={this.state.stories} />
      </section>
    );
  }
}

OwnedStories.propTypes = {
  client: PropTypes.object(Pivotal),
};

export default OwnedStories;
