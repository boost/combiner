import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handlePivotalClick = this.handlePivotalClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  handleTabClick() {
    this.props.onTabClick('tab');
  }

  handlePivotalClick() {
    this.props.onTabClick('pivotal');
  }

  handleSettingsClick() {
    this.props.onTabClick('settings');
  }

  render() {
    return (
      <footer>
        <div className={this.props.active == 'tab' ? 'active' : ''} onClick={this.handleTabClick}>
          <p><i id='tab' className="fas fa-folder"></i></p>
          <p>Tab</p>
        </div>
        <div className={this.props.active == 'pivotal' ? 'active' : ''} onClick={this.handlePivotalClick}>
          <p><i id='pivotal' className="fas fa-book-open"></i></p>
          <p>Pivotal</p>
        </div>
        <div className={this.props.active == 'settings' ? 'active' : ''} onClick={this.handleSettingsClick}>
          <p><i id='settings' className="fas fa-cogs"></i></p>
          <p>Settings</p>
        </div>
      </footer>
    );
  }
}

export default Footer;