import React, { Component } from 'react';
import PivotalTokenForm from './PivotalTokenForm';

class Settings extends Component {
  render() {
    return (
      <PivotalTokenForm token={this.props.token} onValid={this.props.onValid} />
    );
  }
}

export default Settings;