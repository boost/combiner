import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './footer/Footer';
import Body from './Body';
import OwnedStories from './stories/OwnedStories';
import PivotalStories from './stories/PivotalStories';
import PivotalTokenForm from './settings/PivotalTokenForm';
import Settings from './settings/Settings';
import Pivotal from 'pivotal';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      hasError: false
    };

    this.handlePivotalValid = this.handlePivotalValid.bind(this);
    this.handleFooterClick = this.handleFooterClick.bind(this);
  }

  componentDidMount() {
    browser.storage.local.get('pivotal_token')
    .then(value => {
      if (value.pivotal_token !== undefined) {
        return this.setState({
          client: new Pivotal(value.pivotal_token),
          activeTab: 'tab'
        });
      }
    });
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  handlePivotalValid(client) {
    let value = {pivotal_token: client.token};
    browser.storage.local.set(value);
    this.setState({client: client, activeTab: 'tab'});
  }

  handleFooterClick(tab) {
    this.setState({activeTab: tab});
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    if (!this.state.client) {
      return <PivotalTokenForm token='' onValid={this.handlePivotalValid} />
    }
    let body = null;
    if (this.state.activeTab == 'tab') {
      body = <OwnedStories client={this.state.client} />
    } else if (this.state.activeTab == 'pivotal') {
      body = <PivotalStories client={this.state.client} />
    } else if (this.state.activeTab == 'settings') {
      body = <Settings token={this.state.client.token} onValid={this.handlePivotalValid} />
    }
    return (
      <div className='grid-container full'>
        <Header active={this.state.activeTab} />
        {body}
        <Footer active={this.state.activeTab} onTabClick={this.handleFooterClick} />
      </div>
    )
  }
}

export default Root;