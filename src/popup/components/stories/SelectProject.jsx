import React, { Component } from 'react';
import { projects, currentProject } from 'utils';

class SelectProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {id: 0, name: '...'},
      projects: [{id: 0, name: '...'}]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    projects(this.props.client)
    .then(projects => {

      return currentProject(this.props.client, projects)
      .then(project => {

        this.props.onProjectChange(project);
        return this.setState({
          projects: projects,
          currentProject: project
        });

      });
    })
  }

  handleChange(event) {
    const id = event.target.value;
    const project = this.state.projects.find(project => project.id == id);
    this.setState({
      currentProject: project
    });
    browser.storage.local.set({'currentProject': project});

    this.props.onProjectChange(project);
  }

  render() {
    return (
      <select value={this.state.currentProject.id} onChange={this.handleChange}>
        {
          this.state.projects.map(project =>
            <option key={project.id} value={project.id}>{project.name}</option>)
        }
      </select>
    )
  }
}

export default SelectProject;