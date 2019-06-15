import React, { Component } from 'react';
import { buildName, buildStoryUrl } from 'utils/harvest';

class HarvestButton extends Component {
  componentDidMount() {
    var event = new CustomEvent("harvest-event:timers:add", {
      detail: { element: document.querySelector(`#harvest-button-${this.props.data.id}`) }
    });
    document.querySelector("#harvest-messaging").dispatchEvent(event);
  }

  render() {
    const item = JSON.stringify({
      id: this.props.data.id,
      name: buildName(this.props.data)
    });
    const group = JSON.stringify({
      id: this.props.data.project.id,
      name: this.props.data.project.name
    });
    return (
      <button
        id={`harvest-button-${this.props.data.id}`}
        className={this.props.className}
        data-item={item}
        data-group={group}
        data-permalink={buildStoryUrl(this.props.data)}
      >
        {this.props.children}
      </button>
    );
  }
}

export default HarvestButton;