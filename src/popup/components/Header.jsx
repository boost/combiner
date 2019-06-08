import React, { Component } from 'react';
import { getCurrentIteration } from 'utils';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iteration: null
    }
    this.getTitle = this.getTitle.bind(this);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && this.props.active == 'pivotal') {
      if (this.state.iteration == null) {
        const iteration = await getCurrentIteration(this.props.client);
        this.setState({iteration: iteration});
      }
    }
  }

  getTitle(active) {
    switch (this.props.active) {
      case 'tab': return 'My stories';
      case 'pivotal':
        return `Iteration ${this.state.iteration ? this.state.iteration.number : ''}`;
      case 'utils': return 'Utils';
      case 'settings': return 'Settings';
    }
  }

  render() {
    let title = null;
    return (
      <header>
        <h1>
          {this.getTitle(this.props.active)}
        </h1>
      </header>
    )
  }
}

export default Header;