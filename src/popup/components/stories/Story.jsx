import React, { Component } from 'react';
import browser from 'webextension-polyfill';
import { sendStoryDetails } from 'utils';
import StoryLine from './StoryLine';
import StoryDetailsEdit from './details/StoryDetailsEdit';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    };
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleAutofillClick = this.handleAutofillClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleDetailsClick() {
    this.setState({details: true});
  }

  handleAutofillClick() {
    sendStoryDetails(this.props.client, this.props.data)
    .catch(error => { console.log(`Error: ${error}`); });
  }

  handleCloseClick() {
    this.setState({details: false});
  }

  render() {
    if (this.state.details) {
      return (
        <StoryDetailsEdit
          story={this.props.data}
          onCloseClick={this.handleCloseClick}
          client={this.props.client} />
      );
    } else {
      return (
        <StoryLine
          data={this.props.data}
          onAutofillClick={this.handleAutofillClick}
          onTitleClicked={this.handleDetailsClick} />
      );
    }
  }
}

export default Story;
