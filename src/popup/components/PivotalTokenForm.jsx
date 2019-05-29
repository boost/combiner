import React, { Component } from 'react';
import Pivotal from '../../lib/pivotal/Pivotal';

class PivotalTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleValidate() {
    this.props.onValid(this.state.value);
  }

  render() {
    return (
      <div>
        <div className="explanation">
          <p>You haven't provided your API token yet.</p>
          <p>
            If you are logged in Pivotal, you can find it
            <a href='https://www.pivotaltracker.com/profile#api' target='_blank'>here</a>.
          </p>
        </div>
        <div>
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </div>
        <button onClick={this.handleValidate}>Validate</button>
      </div>
    )
  }
}

export default PivotalTokenForm;