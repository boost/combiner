import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import bindAll from 'lodash/bindAll';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.previewDefaultText = 'Preview your [Markdown formatted](https://www.pivotaltracker.com/help/markdown) text here.';
    this.state = {
      writeCommentActive: true,
      previewSource: this.previewDefaultText,
      story: props.story
    };
    bindAll(this, [
      'handleCommentChange',
      'handleWriteCommentClick',
      'handlePreviewCommentClick'
    ]);
  }

  handleWriteCommentClick() {
    this.setState({writeCommentActive: true});
  }

  handlePreviewCommentClick() {
    this.setState({writeCommentActive: false});
  }

  handleCommentChange(event) {
    const value = event.target.value;
    this.setState({
      comment: value,
      previewSource: value == '' ? this.previewDefaultText : value
    });
  }

  render() {
    const comments = this.state.story.comments.map(comment => {
      const person = this.props.projectMembers.find(member => member.id == comment.person_id);
      const edited = comment.created_at != comment.updated_at ? ' - Edited' : '';
      const date = new Date(Date.parse(comment.updated_at));
      const dateStr = `${date.toDateString()}, ${date.toTimeString().split(' ')[0]}${edited}`;
      return (
        <li key={`comment-${comment.id}`} className="cell">
          <h5>@{person.name}</h5>
          <ReactMarkdown source={comment.text} />
          <a role="button">Copy Link</a>
          <span className="comment-date">{dateStr}</span>
        </li>
      );
    });

    return (
      <section className="activity">
        <div className="grid-x">
          <h4 className="cell auto">Activity</h4>
          <label className="cell shrink">Sort by</label>
          <select className="cell shrink">
            <option value="asc">Oldest to newest</option>
            <option value="desc">Newest to oldest</option>
          </select>
        </div>
        <ul className="comments grid-x">
          {comments}
        </ul>
        <div>
          <ul className="tabs" data-tabs id="add-comment">
            <li
              className={`tabs-title${ this.state.writeCommentActive ? ' is-active' : ''}`}
              onClick={this.handleWriteCommentClick}>
              <a href="#write-comment" aria-selected={this.state.writeCommentActive}>
                Write
              </a>
            </li>
            <li
              className={`tabs-title${!this.state.writeCommentActive ? ' is-active' : ''}`}
              onClick={this.handlePreviewCommentClick}>
              <a href="#preview-comment" aria-selected={!this.state.writeCommentActive}>
                Preview
              </a>
            </li>
          </ul>
          <div className="tabs-content" data-tabs-content="add-comment">
            <TextareaAutosize
              id="write-comment"
              className={`tabs-panel${this.state.writeCommentActive ? ' is-active' : ''}`}
              rows="2"
              placeholder="Add a comment"
              onChange={this.handleCommentChange} />

            <div
              className={`tabs-panel${!this.state.writeCommentActive ? ' is-active' : ''}`}
              id="preview-comment">
              <ReactMarkdown
                source={this.state.previewSource}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Activity;
