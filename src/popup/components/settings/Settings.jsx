import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pivotal from 'pivotal'
import PivotalTokenForm from './PivotalTokenForm'
import SelectProject from './SelectProject'
import bindAll from 'lodash/bindAll'

class Settings extends Component {
  constructor(props) {
    super(props)

    bindAll(this, ['handlePivotalValid', 'handleProjectChange'])
  }

  handlePivotalValid() {
    // print a popup indicating it was updated
    this.props.notification('Update', 'Your pivotal token has been updated.')
  }

  handleProjectChange(project) {
    // print a popup indicating it was updated
    this.props.notification('Update', `Project is now "${project.name}"`)
    this.props.onProjectChange(project)
  }

  render() {
    return (
      <section>
        <PivotalTokenForm token={this.props.client.token} onValid={this.handlePivotalValid} />
        <SelectProject client={this.props.client} onProjectChange={this.handleProjectChange} />
      </section>
    )
  }
}

Settings.propTypes = {
  client: PropTypes.instanceOf(Pivotal),
  notification: PropTypes.func,
  onProjectChange: PropTypes.func
}

export default Settings
