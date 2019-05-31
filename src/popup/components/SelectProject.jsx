import React, { Component } from 'react';

class SelectProject extends Component {
  render() {
    return (
      <select value={this.props.currentProject.id} onChange={this.props.onChange}>
        {
          this.props.projects.map(project =>
            <option key={project.id} value={project.id}>{project.name}</option>)
        }
      </select>
    )
  }
}

export default SelectProject;