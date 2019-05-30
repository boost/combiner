import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import PivotalTokenForm from './PivotalTokenForm';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePivotalValid = this.handlePivotalValid.bind(this);
  }

  async componentDidMount() {
    const value = await browser.storage.local.get('pivotal_token')
    if (value.pivotal_token !== null) {
      this.setState({pivotal_token: value.pivotal_token});
    }
  }

  handlePivotalValid(client) {
    let value = {pivotal_token: client.token};
    browser.storage.local.set(value);
    this.setState(value);
  }

  render() {
    let body = this.state.pivotal_token ? <Body token={this.state.pivotal_token} /> : <PivotalTokenForm onValid={this.handlePivotalValid} />
    return (
      <div>
        <Header title='Pivotal token' />
        {body}
        <Footer />
      </div>
    )
  }
}

export default Root;