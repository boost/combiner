import browser from 'webextension-polyfill';
import React, { Component } from 'react';
import Pivotal from 'pivotal';
import StoryList from './StoryList';
import SelectProject from './SelectProject';
import { projects, currentProject } from 'utils';

class OwnedStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProject: {id: 0, name: '...'},
      projects: [{id: 0, name: '...'}]
    };

    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  componentDidMount() {
    projects(this.props.client)
    .then(projects => {

      currentProject(this.props.client, projects)
      .then(project => {

        this.setState({
          projects: projects,
          currentProject: project
        });

      });
    })
  }

  handleProjectChange(event) {
    const id = event.target.value;
    const project = this.state.projects.find(project => project.id == id);
    this.setState({
      currentProject: project
    });
  }

  render() {
    return (
      <div>
        <SelectProject
          currentProject={this.state.currentProject}
          projects={this.state.projects}
          onChange={this.handleProjectChange}
        />
        <StoryList client={this.props.client} project={this.state.currentProject} />
      </div>
    );
  }
}

export default OwnedStories;