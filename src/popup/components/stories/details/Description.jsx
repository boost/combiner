import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

class Description extends Component {

  render() {
    return (
      <section className="description">
        <h4>Description</h4>
        <div className="description-html">
          <ReactMarkdown source={this.props.description} />
        </div>
      </section>
    );
  }
}

export default Description;
