import Request from './Request';

class StoryRequest extends Request {
  constructor(client, id) {
    super(client);
    this.id = id;
  }

  uri() {
    return `/stories/${this.id}`;
  }
}

export default StoryRequest;