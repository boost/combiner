import React, { Component } from 'react';
import { getCurrentIteration } from 'utils';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iteration: null
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && this.props.active == 'pivotal') {
      if (this.state.iteration == null) {
        const iteration = await getCurrentIteration(this.props.client);
        this.setState({iteration: iteration});
      }
    }
  }

  render() {
    let title = 'My stories';
    if (this.props.active == 'pivotal') {
      title = `Iteration ${this.state.iteration ? this.state.iteration.number : ''}`;
    } else if (this.props.active == 'settings') {
      title = 'Settings';
    }
    return (
      <header>
        <h1>
          {title}
        </h1>
      </header>
    )
  }
}

export default Header;