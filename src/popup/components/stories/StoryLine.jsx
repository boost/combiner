import React, { Component } from 'react'
import browser from 'webextension-polyfill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HarvestButton from './HarvestButton'

class StoryLine extends Component {
  render() {
    return (
      <li className='story collapsed grid-x'>
        <div className="cell auto" onClick={this.props.onTitleClicked}>
          {this.props.data.name.split(':')[0]}
        </div>
        <div className="cell shrink">
          <div className="button-group">
            <HarvestButton className="button harvest-timer" data={this.props.data}>
              <FontAwesomeIcon icon="clock" />
            </HarvestButton>
            <button className="button" onClick={this.props.onAutofillClick}>
              <FontAwesomeIcon icon="file-signature" />
            </button>
          </div>
        </div>
      </li>
    )
  }
}

export default StoryLine
