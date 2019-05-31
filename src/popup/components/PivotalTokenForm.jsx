import React, { Component } from 'react';
import Pivotal from '../../lib/pivotal/Pivotal';

class PivotalTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token_invalid: null,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleValidate() {
    let client = new Pivotal(this.state.value);
    client.me()
    .then(meJSON => { this.props.onValid(client) })
    .catch(error => {
      this.setState({token_invalid: true})
    });
  }

  render() {
    let help = null;
    if (this.state.token_invalid) {
      help = (<p className='input-error'>Token invalid</p>);
    }
    return (
      <div>
        <div className="explanation">
          <p>You haven't provided your API token yet.</p>
          <p>
            If you are logged in Pivotal, you can find
            it <a href='https://www.pivotaltracker.com/profile#api'>here</a>.
          </p>
        </div>
        <div>
          <input type='text' value={this.state.value} onChange={this.handleChange} />
          {help}
        </div>
        <button onClick={this.handleValidate}>Validate</button>
      </div>
    )
  }
}

export default PivotalTokenForm;