import React, { Component } from 'react';
import browser from 'webextension-polyfill';

class Story extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Story clicked');

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      const tab = tabs[0];
      console.log('tab:', tab)
      browser.tabs.sendMessage(
        tab.id,
        this.props.data
      ).catch(onError);
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