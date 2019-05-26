import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';

class Root extends Component {
  constructor() {
    super();
    // browser.storage.local.get('pivotal').then(
    //   item => {
    //     console.log('Root success:', item);
    //   },
    //   error => {
    //     console.log('Root error:', error);
    //   }
    // )
  }

  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
}

export default Root;