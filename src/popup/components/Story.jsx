import React, { Component } from 'react';

class Story extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

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