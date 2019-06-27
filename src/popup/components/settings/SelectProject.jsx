import React, { Component } from 'react';
import { getProjects, getCurrentProject } from 'utils';

class SelectProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {id: 0, name: '...'},
      projects: [{id: 0, name: '...'}]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const projects = await getProjects(this.props.client);
    const project = await getCurrentProject(this.props.client);

    this.setState({
      projects: projects,
      currentProject: project
    });
  }

  handleChange(event) {
    const id = event.target.value;
    const project = this.state.projects.find(project => project.id == id);

    browser.storage.local.set({'currentProject': project});
    this.props.onProjectChange(project);
    this.setState({
      currentProject: project
    });
  }

  render() {
    return (
      <div>
        <label htmlFor='project'>Project</label>
        <select id='project' value={this.state.currentProject.id} onChange={this.handleChange}>
          {
            this.state.projects.map(project =>
              <option key={project.id} value={project.id}>{project.name}</option>)
          }
        </select>
      </div>
    )
  }
}

export default SelectProject;
