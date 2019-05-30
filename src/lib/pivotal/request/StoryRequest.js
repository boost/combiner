import Request from './Request';

class StoryRequest extends Request {
  constructor(client, id) {
    super(client);
    this.id = id;
  }

  uri() {
    return `/stories/${this.id}`;
  }

  fetchStory(storyId) {
    return fetch(`${PIVOTAL_URL}/stories/${storyId}`)
    .then((storyResponse) => { return storyResponse.json(); })
    .then((storyJSON) => {
      return fetchOwners(storyJSON)
      .then((ownersJSON) => {
        storyJSON.owners = ownersJSON;
        return fetchRequester(storyJSON)
        .then((person) => {
          storyJSON.requester = person;
          return storyJSON;
        });
      })
    });
  }
}

export default StoryRequest;