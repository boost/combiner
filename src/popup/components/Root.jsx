import { hot } from 'react-hot-loader/root';
import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './footer/Footer';
import Utils from './utils/Utils';
import OwnedStories from './stories/OwnedStories';
import IterationStories from './stories/IterationStories';
import PivotalTokenForm from './settings/PivotalTokenForm';
import Settings from './settings/Settings';
import Pivotal from 'pivotal';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { getCurrentProject } from 'utils';

class Root extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();

    this.state = {
      client: null,
      hasError: false
    };

    this.addNotification = this.addNotification.bind(this);
    this.handlePivotalValid = this.handlePivotalValid.bind(this);
    this.handleFooterClick = this.handleFooterClick.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.getBody = this.getBody.bind(this);
  }

  async componentDidMount() {
    const value = await browser.storage.local.get('pivotal_token');
    if (value.pivotal_token !== undefined) {
      this.setState({
        client: new Pivotal(value.pivotal_token),
        activeTab: 'tab'
      });
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  addNotification(title, message, type = 'success') {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  handlePivotalValid(client) {
    this.setState({client: client, activeTab: 'settings'});
  }

  handleFooterClick(tab) {
    this.setState({activeTab: tab});
  }

  handleProjectChange(project) {
    this.setState({project: project});
  }

  getBody(activeTab) {
    switch(activeTab) {
      case 'tab': return <OwnedStories client={this.state.client} />
      case 'pivotal': return <IterationStories client={this.state.client} />
      case 'utils': return <Utils client={this.state.client} notification={this.addNotification} />
      case 'settings': return <Settings client={this.state.client} notification={this.addNotification} />
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    if (!this.state.client) {
      return <PivotalTokenForm token='' onValid={this.handlePivotalValid} />
    }
    return (
      <div className='grid-container full'>
        <ReactNotification ref={this.notificationDOMRef} />
        <Header active={this.state.activeTab} client={this.state.client} />
        {this.getBody(this.state.activeTab)}
        <Footer onProjectChange={this.handleProjectChange} active={this.state.activeTab} onTabClick={this.handleFooterClick} />
      </div>
    )
  }
}

export default hot(Root);
