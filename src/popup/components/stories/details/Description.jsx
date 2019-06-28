import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from './MarkdownEditor';
import bindAll from 'lodash/bindAll';

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.story.description,
      editMode: false
    };

    bindAll(this, ['handleSubmit']);
  }

  handleSubmit(description) {
    this.setState({
      editMode: false,
      description: description
    });
  }

  render() {

    const content = this.state.editMode ?
      <MarkdownEditor id='description' content={this.state.description} onValidSubmit={this.handleSubmit} /> :
      <ReactMarkdown source={this.state.description} />;

    return (
      <section className="description">
        <h4>Description</h4>
        <div
          className={`${this.state.editMode ? 'description-edit' : 'description-html'}`}
          onClick={() => this.setState({editMode: true})}>
          {content}
        </div>
      </section>
    );
  }
}

export default Description;
