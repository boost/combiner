import MeRequest                 from './request/MeRequest';
import StoryRequest              from './request/StoryRequest';
import StoriesRequest            from './request/StoriesRequest';
import ProjectsRequest           from './request/ProjectsRequest';
import IterationRequest          from './request/IterationRequest';
import IterationsRequest         from './request/IterationsRequest';
import StoryTasksRequest         from './request/StoryTasksRequest';
import StoryOwnersRequest        from './request/StoryOwnersRequest';
import StoryBlockersRequest      from './request/StoryBlockersRequest';
import ProjectMembershipsRequest from './request/ProjectMembershipsRequest';

class Pivotal {
  constructor(token = null) {
    this.token = token;
  }

  me() {
    return new MeRequest(this).request();
  }

  story(id, options = {}) {
    return new StoryRequest(this, id, options).request();
  }

  storyOwners(project_id, story_id) {
    return new StoryOwnersRequest(this, project_id, story_id).request();
  }

  storyBlockers(project_id, story_id) {
    return new StoryBlockersRequest(this, project_id, story_id).request();
  }

  storyTasks(project_id, story_id) {
    return new StoryTasksRequest(this, project_id, story_id).request();
  }

  stories(project_id, options = {}) {
    return new StoriesRequest(this, project_id, options).request();
  }

  projects(options = {}) {
    return new ProjectsRequest(this, options).request();
  }

  iterations(project_id, options = {}) {
    return new IterationsRequest(this, project_id, options).request();
  }

  iteration(project_id, iteration_number, options = {}) {
    return new IterationRequest(this, project_id, iteration_number, options).request();
  }

  projectMemberships(project_id) {
    return new ProjectMembershipsRequest(this, project_id).request();
  }
}


export default Pivotal;