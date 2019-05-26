import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super();
    props.title = 'Pivotal token';
  }

  render() {
    return (
      <header>
        <h1 class="subheader text-center">
          {this.props.title}
        </h1>
      </header>
    )
  }
}

export default Header;