import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import HarvestButton from '../HarvestButton';
import { copyToClipboard } from 'utils/clipboard';
import { buildStoryUrl } from 'utils/pivotal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bindAll from 'lodash/bindAll';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: props.story
    };

    bindAll(this, [
      'handleCopyLinkClick',
      'handleCopyIdClick',
      'handleStoryTypeChange',
      'handleEstimateChange',
      'handleRequesterChange',
      'handleFollowChange',
    ]);
  }


  handleCopyLinkClick() {
    console.log('copyLink', copyValue);
    const copyValue = buildStoryUrl(this.props.story);
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

  render() {
    return (
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
          <div className="grid-x align-margin-x">
            <div className="medium-6 cell info_box_wrapper">
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
            <div className="medium-6 cell info_box_wrapper">
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
          </div>
        </aside>
      </section>
    );
  }
};

export default Details;
