import React, { Component } from 'react'
import { getCurrentIteration } from 'utils'
import browser from 'webextension-polyfill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      iteration: null
    }
    this.getTitle = this.getTitle.bind(this)
    this.handlePopOut = this.handlePopOut.bind(this)
    this.inPopup = this.inPopup.bind(this)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && this.props.active == 'pivotal') {
      if (this.state.iteration == null) {
        const iteration = await getCurrentIteration(this.props.client)
        this.setState({iteration: iteration})
      }
    }
  }

  getTitle(active) {
    switch (this.props.active) {
    case 'tab': return 'My stories'
    case 'pivotal':
      return `Iteration ${this.state.iteration ? this.state.iteration.number : ''}`
    case 'utils': return 'Utils'
    case 'settings': return 'Settings'
    }
  }

  inPopup() {
    return window.location.search === '' ||
           window.location.search.indexOf('uilocation=') === -1 ||
           window.location.search.indexOf('uilocation=popup') > -1
  }

  handlePopOut() {
    let href = window.location.href
    let replace = 'uilocation=tab'
    if (href.indexOf('uilocation=tab') > -1 ||
        href.indexOf('uilocation=popout') > -1) {
      replace = 'uilocation=popout'
    }
    href = href.replace('uilocation=popup',   replace)
      .replace('uilocation=tab',     replace)
      .replace('uilocation=sidebar', replace)

    if (replace == 'uilocation=tab') {
      browser.tabs.create({ url: href })
    } else {
      browser.windows.create({ url: href })
    }

    if (this.inPopup()) {
      window.close()
    }
  }

  render() {
    let title = null
    return (
      <header className='grid-x'>
        <button className='cell shrink button' onClick={this.handlePopOut}>
          <FontAwesomeIcon icon='external-link-alt' flip='horizontal' inverse />
        </button>
        <h1 className='cell auto'>
          {this.getTitle(this.props.active)}
        </h1>
      </header>
    )
  }
}

export default Header
