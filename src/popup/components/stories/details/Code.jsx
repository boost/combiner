import React, { Component } from 'react';
import bindAll from 'lodash/bindAll';

class Code extends Component {
  constructor(props) {
    super(props);
    bindAll(this, ['handleCodeChange']);
  }

  handleCodeChange() {}

  render() {
    return (
      <section className="code">
        <h4>
          <a href="https://www.pivotaltracker.com/help/articles/github_integration">Code</a>
        </h4>
        <input
          aria-label="GitHub Paste Link"
          type="text"
          placeholder="Paste link to pull request or branch..."
          value=""
          onChange={this.handleCodeChange} />
      </section>
    );
  }
}

export default Code;
