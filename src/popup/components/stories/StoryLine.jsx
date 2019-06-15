import React, { Component } from 'react';
import browser from 'webextension-polyfill';
import { sendStoryDetails } from 'utils';
import StoryDetails from './StoryDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buildGetUrl } from 'utils';
import HarvestButton from './HarvestButton';

class StoryLine extends Component {
  render() {
    return (
      <li className='story story-small grid-x'>
        <div className="cell small-8" onClick={this.props.onTitleClicked}>
          {this.props.data.name.split(':')[0]}
        </div>
        <div className="cell shrink">
          <div className="button-group">
            <HarvestButton className="button" data={this.props.data}>
              <FontAwesomeIcon icon="clock" />
            </HarvestButton>
            <button className="button" onClick={this.handleAutofillClick}>
              <FontAwesomeIcon icon="file-signature" />
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default StoryLine;