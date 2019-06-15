import React, { Component } from 'react';
import PivotalTokenForm from './PivotalTokenForm';
import SelectProject from './SelectProject';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handlePivotalValid = this.handlePivotalValid.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  handlePivotalValid(client) {
    // print a popup indicating it was updated
    this.props.notification('Update', `Your pivotal token has been updated.`);
  }

  handleProjectChange(project) {
    // print a popup indicating it was updated
    this.props.notification('Update', `Project is now "${project.name}"`);
    this.props.onProjectChange(project);
  }

  render() {
    return (
      <section>
        <PivotalTokenForm token={this.props.client.token} onValid={this.handlePivotalValid} />
        <SelectProject client={this.props.client} onProjectChange={this.handleProjectChange} />
      </section>
    );
  }
}

export default Settings;