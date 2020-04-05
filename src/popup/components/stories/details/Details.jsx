import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pivotal from 'pivotal'
import TextareaAutosize from 'react-textarea-autosize'
import HarvestButton from '../HarvestButton'
import { copyToClipboard } from 'utils/clipboard'
import { buildStoryUrl } from 'utils/pivotal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Owners from './Owners'
import bindAll from 'lodash/bindAll'
import { buildPossibleRequesters } from 'utils/pivotal'

class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      story: props.story,
      memberships: props.memberships.filter(membership => membership.role == 'owner' || membership.role == 'member')
    }

    bindAll(this, [
      'handleCopyLinkClick',
      'handleCopyIdClick',
      'handleKindChange',
      'handleStateChange',
      'handleEstimateChange',
      'handleRequesterChange',
      'handleFollowingChange',
    ])
  }

  handleCopyLinkClick() {
    copyToClipboard(buildStoryUrl(this.props.story), null)
    // TODO add animation to validate the copy
  }

  handleCopyIdClick() {
    copyToClipboard(this.props.story.id, null)
    // TODO add animation to validate the copy
  }

  handleStateChange(event) {
    console.log('STATUS:', event.target.value)
  }

  handleEstimateChange(event) {
    console.log('ESTIMATE:', event.target.value)
    let story = this.state
    story.estimate = event.target.value
    this.setState({story: story})
  }

  handleKindChange(event) {
    console.log('STORY_TYPE:', event.target.value)
  }

  handleRequesterChange(event) {
    console.log('REQUESTER:', event.target.value)
  }

  handleFollowingChange(event) {
    console.log('FOLLOW:', event.target.checked)
  }

  render() {
    const { story } = this.props
    const states = ['unstarted', 'started', 'finished', 'delivered', 'accepted', 'rejected']
    const actions = ['unstart', 'start', 'finish', 'deliver', 'accept', 'reject']
    const actionIndex = states.indexOf(state => state == story.current_state)
    const stateAction = actions[actionIndex + 1]
    const possibleRequesters = buildPossibleRequesters(this.state.memberships)

    return (
      <section className="story_details">
        <section className="story_header grid-x">
          <button className="collapser" onClick={this.props.onCloseClick}></button>
          <fieldset className="name cell auto">
            <TextareaAutosize rows="1" className="story-name-textarea" defaultValue={story.name} />
          </fieldset>
          <a href={buildStoryUrl(story)} type="button" className="open-story" title="Switch to a full page view of this story"></a>
        </section>

        <aside>
          <section className="controls">
            <div className="small button-group">
              <button className="button" onClick={this.handleCopyLinkClick} title="Copy this story's link to your clipboard"><FontAwesomeIcon icon="link" /></button>
              <HarvestButton className="button harvest-timer" data={story}><FontAwesomeIcon icon="clock" /></HarvestButton>
              <button className="button" onClick={this.handleCopyIdClick} title="Copy this story's ID to your clipboard">ID</button>
              <button className="button secondary" onClick={this.props.onCloseClick}>Close</button>
            </div>
          </section>
          <div className="grid-container fluid">
            <div className="grid-x grid-margin-x">
              <div className="medium-6 cell info_box_wrapper">
                <div className="grid-x row">
                  <label className="cell auto">STATE</label>
                  <button className="button tiny cell shrink" value={stateAction} onClick={this.handleStateChange}>Finish</button>
                  <select className="cell shrink" value={story.current_state} onChange={this.handleStateChange}>
                    { states.map(state => <option key={state} value={state}>{state}</option>) }
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
                  <select className="cell shrink" value={story.kind} onChange={this.handleKindChange}>
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
                      story.project.point_scale.split(',').map(point =>
                        <option key={point} value={point}>{point}</option>
                      )
                    }
                  </select>
                </div>
                <div className="grid-x row">
                  <label className="cell auto">REQUESTER</label>
                  <select className="cell shrink" value={story.requested_by_id} onChange={this.handleRequesterChange}>
                    {
                      possibleRequesters.map(person =>
                        <option key={person.id} value={person.id}>{person.name}</option>
                      )
                    }
                  </select>
                </div>
                <Owners memberships={this.props.memberships} client={this.props.client} story={this.state.story} />
                <div className="grid-x row">
                  <label className="cell auto">FOLLOW THIS STORY</label>
                  <div className="cell shrink">
                  (<span className="followers">2 followers</span>)
                    <input type="checkbox" onChange={this.handleFollowingChange} checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    )
  }
}

Details.propTypes = {
  story: PropTypes.object,
  memberships: PropTypes.array,
  onCloseClick: PropTypes.func,
  client: PropTypes.instanceOf(Pivotal)
}

export default Details
