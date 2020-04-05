import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pivotal from 'pivotal'
import { sendPrDetails, sendR4ADetails } from 'utils'
import StoryLine from './StoryLine'
import StoryDetailsEdit from './details/StoryDetailsEdit'
import browser from 'webextension-polyfill'

class Story extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: false
    }
    this.handleDetailsClick = this.handleDetailsClick.bind(this)
    this.handleAutofillClick = this.handleAutofillClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  handleDetailsClick() {
    this.setState({details: true})
  }

  async handleAutofillClick() {
    const tabs = await browser.tabs.query({active: true, currentWindow: true})
    const tab = tabs[0]
    if (tab.url.match(/basecamp\.com/)) {
      sendR4ADetails(this.props.client, this.props.data, tab)
    } else {
      sendPrDetails(this.props.client, this.props.data, tab)
        .catch(error => { console.log(`Error: ${error}`) })
    }
  }

  handleCloseClick() {
    this.setState({details: false})
  }

  render() {
    if (this.state.details) {
      return (
        <StoryDetailsEdit
          story={this.props.data}
          onCloseClick={this.handleCloseClick}
          client={this.props.client} />
      )
    } else {
      return (
        <StoryLine
          data={this.props.data}
          onAutofillClick={this.handleAutofillClick}
          onTitleClicked={this.handleDetailsClick} />
      )
    }
  }
}

Story.propTypes = {
  client: PropTypes.instanceOf(Pivotal),
  data: PropTypes.object
}

export default Story
