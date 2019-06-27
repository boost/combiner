import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';
import bindAll from 'lodash/bindAll';

class Labels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: props.story
    };

    bindAll(this, ['handleLabelAddition', 'handleLabelDeletion']);
  }

  handleLabelAddition(label) {
    const labels = [].concat(this.state.story.labels, label);
    this.state.story.labels = labels;
    this.setState({ story: this.state.story });
  }

  handleLabelDeletion(i) {
    const labels = this.state.story.labels.slice(0);
    labels.splice(i, 1);
    this.state.story.labels = labels;

    this.setState({ story: this.state.story });
  }

  render() {
    return (
      <section className="labels">
        <h4>Labels</h4>
        <ReactTags
          tags={this.state.story.labels}
          suggestions={this.state.projectLabels}
          handleDelete={this.handleLabelDeletion}
          handleAddition={this.handleLabelAddition} />
      </section>
    );
  }
}

export default Labels;
