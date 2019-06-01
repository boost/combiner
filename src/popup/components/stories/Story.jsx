import React, { Component } from 'react';
import browser from 'webextension-polyfill';

class Story extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      browser.tabs.sendMessage(
        tabs[0].id,
        this.props.data
      ).catch(onError => { console.log(`Error: ${error}`) });
    });
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