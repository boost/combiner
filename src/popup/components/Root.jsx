import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import OwnedStories from './OwnedStories';
import PivotalTokenForm from './PivotalTokenForm';
import Pivotal from 'pivotal';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      hasError: false
    };
    this.handlePivotalValid = this.handlePivotalValid.bind(this);
  }

  componentDidMount() {
    browser.storage.local.get('pivotal_token')
    .then(value => {
      if (value.pivotal_token !== undefined) {
        return this.setState({
          client: new Pivotal(value.pivotal_token)
        });
      }
      return new Promise();
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
    this.setState({client: client});
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    let body = this.state.client ? <OwnedStories client={this.state.client} /> : <PivotalTokenForm onValid={this.handlePivotalValid} />
    return (
      <div>
        <Header title='Boost browser extension' />
        {body}
        <Footer />
      </div>
    )
  }
}

export default Root;