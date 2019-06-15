import React, { Component } from 'react';
import Modal from 'react-modal';
import browser from 'webextension-polyfill';
import { sendStoryDetails } from 'utils';
import StoryDetails from './StoryDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'utils/harvest_resizing';
import { buildGetUrl } from 'utils';
import { buildStoryUrl, buildName } from 'utils/harvest';

class StoryLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      iframeUrl: buildGetUrl('https://platform.harvestapp.com/platform/timer', {
        app_name: 'PivotalTracker',
        permalink: buildStoryUrl(props.data),
        external_item_id: props.data.id,
        external_item_name: buildName(props.data),
        external_group_id: props.data.project.id,
        external_group_name: props.data.project.name
      })
    };
    Modal.setAppElement('body');
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <li className='story story-small grid-x'>
        <div className="cell small-8" onClick={this.props.onTitleClicked}>
          {this.props.data.name.split(':')[0]}
        </div>
        <div className="cell shrink">
          <div className="button-group">
            <button className="button" onClick={this.openModal}>
              <FontAwesomeIcon icon="clock" />
            </button>
            <button className="button" onClick={this.handleAutofillClick}>
              <FontAwesomeIcon icon="file-signature" />
            </button>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Start Harvest timetracker"
          className="harvest-modal"
          overlayClassName="harvest-overlay-modal"
        >
          <button className="close-modal" onClick={this.closeModal}>
            <FontAwesomeIcon size="2x" icon="times" />
          </button>
          <div className="harvest-iframe-wrapper">
            <iframe src={this.state.iframeUrl}></iframe>
          </div>
        </Modal>
      </li>
    );
  }
}

export default StoryLine;