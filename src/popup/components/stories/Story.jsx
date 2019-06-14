import React, { Component } from 'react';
import Modal from 'react-modal';
import browser from 'webextension-polyfill';
import { sendStoryDetails } from 'utils';
import StoryDetails from './StoryDetails';
import 'utils/harvest_resizing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false,
      modalIsOpen: false
    };
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleAutofillClick = this.handleAutofillClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleDetailsClick() {
    this.setState({details: true});
  }

  handleAutofillClick() {
    sendStoryDetails(this.props.client, this.props.data)
    .catch(error => { console.log(`Error: ${error}`); });
  }

  handleCloseClick() {
    this.setState({details: false});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const pivotalWidgetParams = {
      app_name: 'PivotalTracker',
      permalink: `https://www.pivotaltracker.com/story/show/${this.props.data.id}`,
      external_item_id: this.props.data.id,
      external_item_name: this.props.data.name,
      external_group_id: this.props.data.project_id,
      external_group_name: 'Test'
    }
    const urlParams = '?' + Object.keys(pivotalWidgetParams).map(key => key + '=' + pivotalWidgetParams[key]).join('&')
    const iframeUrl = `https://platform.harvestapp.com/platform/timer${urlParams}`;
    const modalStyles = {
      content : {
        background : 'transparent',
        inset : 0
      }
    }

    if (this.state.details) {
      return (
        <StoryDetails onCloseClick={this.handleCloseClick} data={this.props.data} client={this.props.client} />
      );
    } else {
      return (
        <li className='story story-small grid-x'>
          <div className="cell small-9" onClick={this.handleDetailsClick}>
            {this.props.data.name.split(':')[0]}
          </div>
          <div className="cell shrink">
            <div className="button-group">
              <button className="button" onClick={this.openModal}>
                <FontAwesomeIcon size="1.5x" icon="clock" />
              </button>
              <button className="button" onClick={this.handleAutofillClick}>
                <FontAwesomeIcon size="1.5x" icon="file-signature" />
              </button>
            </div>
          </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Start Harvest timetracker"
            style={modalStyles}
          >
            <button className="close-modal" onClick={this.closeModal}>
              <FontAwesomeIcon size="2x" icon="times" />
            </button>
            <div className="harvest-iframe-wrapper">
              <iframe src={iframeUrl}></iframe>
            </div>
          </Modal>
        </li>
      );
    }
  }
}

export default Story;