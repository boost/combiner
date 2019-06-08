import React, { Component } from 'react';
import browser from 'webextension-polyfill';
import { sendStoryDetails } from 'utils';

class Story extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    sendStoryDetails(this.props.client, this.props.data)
    .catch(error => { console.log(`Error: ${error}`); });
  }

  render() {
    return (
      <li className='story' onClick={this.handleClick}>
        {this.props.data.name.split(':')[0]}
      </li>
    );
  }
}

export default Story;