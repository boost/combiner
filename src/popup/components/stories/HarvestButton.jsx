import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pivotal from 'pivotal'
import { buildStoryUrl } from 'utils/pivotal'
import { buildName } from 'utils/harvest'
import uniqueId from 'lodash/uniqueId'

class HarvestButton extends Component {
  constructor(props) {
    super(props)
    this.id = uniqueId('harvest-button-')
  }

  componentDidMount() {
    var event = new CustomEvent('harvest-event:timers:add', {
      detail: { element: document.querySelector(`#${this.id}`) }
    })
    document.querySelector('#harvest-messaging').dispatchEvent(event)
  }

  render() {
    const item = JSON.stringify({
      id: this.props.data.id,
      name: buildName(this.props.data)
    })
    const group = JSON.stringify({
      id: this.props.data.project.id,
      name: this.props.data.project.name
    })
    return (
      <button
        id={this.id}
        className={this.props.className}
        data-item={item}
        data-group={group}
        data-permalink={buildStoryUrl(this.props.data)}
      >
        {this.props.children}
      </button>
    )
  }
}

HarvestButton.propTypes = {
  client: PropTypes.instanceOf(Pivotal),
  data: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.element
}

export default HarvestButton
