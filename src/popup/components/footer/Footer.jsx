import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handlePivotalClick = this.handlePivotalClick.bind(this);
    this.handleUtilsClick = this.handleUtilsClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  handleTabClick() {
    this.props.onTabClick('tab');
  }

  handlePivotalClick() {
    this.props.onTabClick('pivotal');
  }

  handleUtilsClick() {
    this.props.onTabClick('utils');
  }

  handleSettingsClick() {
    this.props.onTabClick('settings');
  }

  render() {
    return (
      <footer>
        <div className={this.props.active == 'tab' ? 'active' : ''} onClick={this.handleTabClick}>
          <p><FontAwesomeIcon size='2x' icon="folder" /></p>
          <p>Started</p>
        </div>
        <div className={this.props.active == 'pivotal' ? 'active' : ''} onClick={this.handlePivotalClick}>
          <p><FontAwesomeIcon size='2x' icon="book-open" /></p>
          <p>Iteration</p>
        </div>
        <div className={this.props.active == 'utils' ? 'active' : ''} onClick={this.handleUtilsClick}>
          <p><FontAwesomeIcon size='2x' icon="sticky-note" /></p>
          <p>Utils</p>
        </div>
        <div className={this.props.active == 'settings' ? 'active' : ''} onClick={this.handleSettingsClick}>
          <p><FontAwesomeIcon size='2x' icon="cogs" /></p>
          <p>Settings</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
