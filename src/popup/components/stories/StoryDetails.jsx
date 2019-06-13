import React, { Component } from 'react';
import showdown from 'showdown';

class StoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  componentDidMount() {
    this.setState({
      ready: true,
      story: this.props.data
    })
  }

  render() {
    if (!this.state.ready) return (<p>Loading...</p>);

    let description = new showdown.Converter().makeHtml(this.state.story.description);
    description = description ? description : 'No description';

    return (
      <li className='story story-details grid-x'>
        <p className="cell">{this.state.story.name}</p>

        <p className="story-description cell" dangerouslySetInnerHTML={{ __html: description }} />
        <button className="button" onClick={this.props.onCloseClick}>Close</button>
      </li>
    );
  }
}

export default StoryDetails;