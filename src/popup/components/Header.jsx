import React, { Component } from 'react';

class Header extends Component {
  render() {
    let title = 'Started stories';
    if (this.props.active == 'pivotal') {
      title = 'Iteration stories';
    } else if (this.props.active == 'settings') {
      title = 'Settings';
    }
    return (
      <header>
        <h1>
          {title}
        </h1>
      </header>
    )
  }
}

export default Header;