import React, { Component } from "react";
import PropTypes from "prop-types";
import Pivotal from "pivotal";
import browser from "webextension-polyfill";

class PivotalTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token_invalid: null,
      value: props.token,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleValidate() {
    let client = new Pivotal(this.state.value);
    client
      .me()
      .then(() => {
        browser.storage.local.set({ pivotal_token: client.token });
        this.props.onValid(client);
      })
      .catch(() => {
        this.setState({ token_invalid: true });
      });
  }

  handleProfileClick(event) {
    event.preventDefault();
    browser.tabs.create({
      url: event.target.href,
    });
  }

  render() {
    let help = null;
    if (this.state.token_invalid) {
      help = (
        <small className="help-text" id="token-invalid">
          Token invalid
        </small>
      );
    }

    let explanations = <label htmlFor="token">Pivotal token</label>;
    if (!this.props.token) {
      explanations = (
        <div className="explanation">
          <p>You haven&apos;t provided your API token yet.</p>
          <p>
            If you are logged in Pivotal, you can find it{" "}
            <a
              href="https://www.pivotaltracker.com/profile#api"
              onClick={this.handleProfileClick}
            >
              here
            </a>
            .
          </p>
        </div>
      );
    }

    return (
      <section>
        {explanations}
        <div className="input-group">
          <input
            aria-describedby="token-invalid"
            className="input-group-field"
            type="text"
            id="token"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <div className="input-group-button">
            <button className="button" onClick={this.handleValidate}>
              Validate
            </button>
          </div>
        </div>
        {help}
      </section>
    );
  }
}

PivotalTokenForm.propTypes = {
  client: PropTypes.instanceOf(Pivotal),
  onProjectChange: PropTypes.func,
  token: PropTypes.string,
  onValid: PropTypes.func,
};

export default PivotalTokenForm;
