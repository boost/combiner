import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Your pivotal token is: {this.props.token}</p>
      </div>
    )
  }
}

export default Body;