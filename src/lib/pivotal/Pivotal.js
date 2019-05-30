import MeRequest from './request/MeRequest';
import StoryRequest from './request/StoryRequest';
import ProjectsRequest from './request/ProjectsRequest';


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

  projects() {
    return new ProjectsRequest(this).request();
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
    const url = `${PIVOTAL_URL}/projects/${story.project_id}/memberships`
    return fetch(url)
    .then((response) => { return response.json(); });
  }
}


export default Pivotal;