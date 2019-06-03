import MeRequest       from './request/MeRequest';
import StoryRequest    from './request/StoryRequest';
import StoriesRequest  from './request/StoriesRequest';
import ProjectsRequest from './request/ProjectsRequest';
import IterationRequest from './request/IterationRequest';
import IterationsRequest from './request/IterationsRequest';

class Pivotal {
  constructor(token = null) {
    this.token = token;
  }

  me() {
    return new MeRequest(this).request();
  }

  story(id) {
    return new StoryRequest(this, id).request();
  }

  stories(project_id, options = {}) {
    return new StoriesRequest(this, project_id, options).request();
  }

  projects() {
    return new ProjectsRequest(this).request();
  }

  iterations(project_id) {
    return new IterationsRequest(this, project_id).request();
  }

  iteration(project_id, iteration_number) {
    return new IterationsRequest(this, project_id, iteration_number).request();
  }

  fetchOwners(story) {
    const url = `${PIVOTAL_URL}/projects/${story.project_id}/stories/${story.id}/owners`
    return fetch(url)
    .then((response) => { return response.json(); });
  }

  fetchRequester(story) {
    return fetchMemberships(story)
    .then((memberships) => {
      const membership = memberships.find((u) => u.person.id === story.requested_by_id);
      return membership.person;
    });
  }

  fetchMemberships(story) {
    const url = `${PIVOTAL_URL}/projects/${story.project_id}/memberships`;
    return fetch(url)
    .then((response) => { return response.json(); });
  }
}


export default Pivotal;