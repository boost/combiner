import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTags from "react-tag-autocomplete";
import bindAll from "lodash/bindAll";

class Labels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: props.story,
    };

    this.reactTags = React.createRef();
    bindAll(this, ["handleAddition", "handleDeletion", "handleValidate"]);
  }

  handleAddition(label) {
    console.log("handleAddition");
    const story = this.state.story;
    const labels = [].concat(story.labels, label);
    story.labels = labels;
    this.setState({ story: story });
  }

  handleDeletion(i) {
    const story = this.state.story;
    const labels = story.labels.slice(0);
    labels.splice(i, 1);
    story.labels = labels;

    this.setState({ story: story });
  }

  handleValidate(tag) {
    console.log(tag);
    return true;
  }

  render() {
    return (
      <section className="labels">
        <h4>Labels</h4>
        <ReactTags
          ref={this.reactTags}
          tags={this.state.story.labels}
          suggestions={this.props.projectLabels}
          allowNew={true}
          onDelete={this.handleDeletion}
          onAddition={this.handleAddition}
          delimiters={[","]}
        />
      </section>
    );
  }
}

Labels.propTypes = {
  story: PropTypes.object,
  projectLabels: PropTypes.array,
};

export default Labels;
