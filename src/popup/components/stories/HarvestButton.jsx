import React, { Component } from 'react';
import { buildName } from 'utils/harvest';

class HarvestButton extends Component {
  componentDidMount() {
    var event = new CustomEvent("harvest-event:timers:add", {
      detail: { element: document.querySelector(`#harvest-button-${this.props.data.id}`) }
    });
    document.querySelector("#harvest-messaging").dispatchEvent(event);
  }

  render() {
    return (
      <div
        id={`harvest-button-${this.props.data.id}`}
        className={this.props.className}
        data-item={`{"id":${this.props.data.id},"name":"${buildName(this.props.data)}"}`}>
        {this.props.children}
      </div>
    );
  }
}

export default HarvestButton;