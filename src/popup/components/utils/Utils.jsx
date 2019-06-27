import React, { Component } from 'react';
import { buildReport } from 'utils/sprint_review';
import { copyToClipboard } from 'utils/clipboard';

class Utils extends Component {
  constructor(props) {
    super(props);
    this.handleClickOnCopyReview = this.handleClickOnCopyReview.bind(this);
  }

  handleClickOnCopyReview() {
    buildReport(this.props.client)
    .then(report => {
      copyToClipboard(null, report);
      this.props.notification('Sprint review report', 'Copied');
    });
  }

  render() {
    return (
      <section>
        <h2>Sprint review</h2>
        <button className="copy-review" onClick={this.handleClickOnCopyReview}>
          Copy report
        </button>
      </section>
    );
  }
}

export default Utils;
