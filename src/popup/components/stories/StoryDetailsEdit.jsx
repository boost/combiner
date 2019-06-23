import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactTags from 'react-tag-autocomplete';
import HarvestButton from './HarvestButton';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bindAll from 'lodash/unescape';
import { buildStoryUrl } from 'utils/pivotal';
import { copyToClipboard } from 'utils/clipboard';
import { enrichStory } from 'utils';

class StoryDetailsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      projectLabels: [],
      story: null,
      writeCommentActive: true,
      comment: ''
    };

    this.handleCopyLinkClick = this.handleCopyLinkClick.bind(this);
    this.handleCopyIdClick = this.handleCopyIdClick.bind(this);
    this.handleStoryTypeChange = this.handleStoryTypeChange.bind(this);
    this.handleEstimateChange = this.handleEstimateChange.bind(this);
    this.handleRequesterChange = this.handleRequesterChange.bind(this);
    this.handleFollowChange = this.handleFollowChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleLabelAddition = this.handleLabelAddition.bind(this);
    this.handleLabelDelete = this.handleLabelDelete.bind(this);
    this.handleWriteCommentClick = this.handleWriteCommentClick.bind(this);
    this.handlePreviewCommentClick = this.handlePreviewCommentClick.bind(this);
  }

  async componentDidMount() {
    const story = await enrichStory(
      this.props.client,
      this.props.story,
      ['tasks', 'blockers', 'owners', 'requester', 'comments']
    );
    const projectLabels = await this.props.client.projectLabels(this.props.story.project_id);
    const projectMemberships = await this.props.client.projectMemberships(this.props.story.project_id);
    const projectMembers = projectMemberships.map(member => member.person);

    this.setState({
      ready: true,
      projectLabels: projectLabels,
      projectMembers: projectMembers,
      story: story
    });
  }

  handleLabelAddition(label) {
    const labels = [].concat(this.state.story.labels, label);
    this.state.story.labels = labels;
    this.setState({ story: this.state.story });
  }

  handleLabelDelete(i) {
    const labels = this.state.story.labels.slice(0);
    labels.splice(i, 1);
    this.state.story.labels = labels;

    this.setState({ story: this.state.story });
  }

  handleCopyLinkClick() {
    const copyValue = buildStoryUrl(this.props.story);
    console.log('copyLink', copyValue);
    copyToClipboard(copyValue, copyValue);
    // TODO add animation to validate the copy
  }

  handleCopyIdClick() {
    copyToClipboard(this.props.id, this.props.id);
    // TODO add animation to validate the copy
  }

  handleEstimateChange(event) {
    this.state.story.estimate = event.target.value;
    this.setState({story: this.state.story});
  }

  handleStoryTypeChange() {}
  handleRequesterChange() {}
  handleFollowChange() {}
  handleCodeChange() {}

  handleCommentChange(event) {
    this.setState({comment: event.target.value});
  }

  handleWriteCommentClick() {
    this.setState({writeCommentActive: true});
  }

  handlePreviewCommentClick() {
    this.setState({writeCommentActive: false});
  }

  render() {
    if (!this.state.ready) return (<p>Loading...</p>);
    const comments = this.state.story.comments.map(comment => {
      const person = this.state.projectMembers.find(member => member.id == comment.person_id);
      const edited = comment.created_at != comment.updated_at ? ' - Edited' : '';
      const date = new Date(Date.parse(comment.updated_at));
      console.log(date);
      console.log(date.toDateString());
      console.log(date.toTimeString());
      const dateStr = `${date.toDateString()}, ${date.toTimeString().split(' ')[0]}${edited}`;
      return (
        <div key={`comment-${comment.id}`} className="cell">
          <h5>@{person.name}</h5>
          <ReactMarkdown source={comment.text} />
          <a role="button">Copy Link</a>
          <span className="comment-date">{dateStr}</span>
        </div>
      );
    });
    return (
      <li className="story expanded">
        <section className="story_details">
          <section className="story_header grid-x">
            <button className="collapser"></button>
            <fieldset className="name cell auto">
              <TextareaAutosize rows="1" className="story-name-textarea" defaultValue={this.props.story.name} />
            </fieldset>
            <a href={buildStoryUrl(this.props.story)} type="button" className="open-story" title="Switch to a full page view of this story"></a>
          </section>

          <aside>
            <section className="controls">
              <div className="small button-group">
                <button className="button"><FontAwesomeIcon icon="link" /></button>
                <HarvestButton className="button harvest-timer" data={this.props.story}><FontAwesomeIcon icon="clock" /></HarvestButton>
                <button className="button" title="Copy this story's ID to your clipboard">ID</button>
                <button className="button secondary" onClick={this.props.onCloseClick}>Close</button>
              </div>
            </section>
            <div className="info_box_wrapper">
              <div className="grid-x row">
                <label className="cell auto">STATE</label>
                <button className="button tiny cell shrink">Finish</button>
                <select className="cell shrink">
                  <option value="started">Started</option>
                  <option value="unstarted">Unstarted</option>
                  <option value="finished">Finished</option>
                  <option value="delivered">Delivered</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="grid-x row">
                <span className="cell auto">REVIEWS</span>
                <a type="button cell shrink">+ add review</a>
              </div>
            </div>
            <div className="info_box_wrapper">
              <div className="grid-x row">
                <label className="cell auto">STORY TYPE</label>
                <select className="cell shrink">
                  <option value="feature">Feature</option>
                  <option value="bug">Bug</option>
                  <option value="chore">Chore</option>
                  <option value="release">Release</option>
                </select>
              </div>
              <div className="grid-x row">
                <label className="cell auto">POINTS</label>
                <select className="cell shrink" value={this.state.story.estimate} onChange={this.handleEstimateChange}>
                  {
                    this.props.story.project.point_scale.split(',').map(point =>
                      <option key={point} value={point}>{point}</option>
                    )
                  }
                </select>
              </div>
              <div className="grid-x row">
                <label className="cell auto">REQUESTER</label>
                <select className="cell shrink">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="grid-x row">
                <label className="cell auto">OWNERS</label>
                <select className="cell shrink">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="grid-x row">
                <label className="cell auto">FOLLOW THIS STORY</label>
                <div className="cell shrink">
                  (<span className="followers">2 followers</span>)
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="blockers">
          <h4>Blockers</h4>
          <div className="add-blocker">
            <FontAwesomeIcon icon="plus" />
            <span className="add-blocker-message">Add blocker or impediment</span>
          </div>
        </section>

        <section className="description">
          <h4>Description</h4>
          <div className="description-html">
            <ReactMarkdown source={this.props.description} />
          </div>
        </section>

        <section className="labels">
          <h4>Labels</h4>
          <ReactTags
            tags={this.state.story.labels}
            suggestions={this.state.projectLabels}
            handleDelete={this.handleLabelDelete}
            handleAddition={this.handleLabelAddition} />
        </section>

        <section className="code">
          <h4>
            <a href="https://www.pivotaltracker.com/help/articles/github_integration">Code</a>
          </h4>
          <input aria-label="GitHub Paste Link" type="text" placeholder="Paste link to pull request or branch..." value="" onChange={this.handleCodeChange} />
        </section>

        <section className="tasks">
          <h4>Tasks (0/0)</h4>
          <div className="add-task">
            <FontAwesomeIcon icon="plus" />
            <span className="add-task-message">Add a task</span>
          </div>
        </section>

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
              <li aria-selected={ this.state.writeCommentActive} className={`tabs-title${ this.state.writeCommentActive ? ' is-active' : ''}`} onClick={this.handleWriteCommentClick}><a href="#write-comment" aria-selected="true">Write</a></li>
              <li aria-selected={!this.state.writeCommentActive} className={`tabs-title${!this.state.writeCommentActive ? ' is-active' : ''}`} onClick={this.handlePreviewCommentClick}><a href="#preview-comment">Preview</a></li>
            </ul>
            <div className="tabs-content" data-tabs-content="add-comment">
              <TextareaAutosize id="write-comment" className={`tabs-panel${ this.state.writeCommentActive ? ' is-active' : ''}`} rows="2" placeholder="Add a comment" onChange={this.handleCommentChange} />
              <div className={`tabs-panel${!this.state.writeCommentActive ? ' is-active' : ''}`} id="preview-comment">
                <ReactMarkdown source={this.state.comment == '' ? 'Preview your [Markdown formatted](https://www.pivotaltracker.com/help/markdown) text here.' : this.state.comment} />
              </div>
            </div>
          </div>
        </section>
      </li>
    );
  }
}

export default StoryDetailsEdit;