import Request from "./Request";

class StoryBlockersRequest extends Request {
  constructor(client, project_id, story_id) {
    super(client);
    this.project_id = project_id;
    this.story_id = story_id;
  }

  uri() {
    return `/projects/${this.project_id}/stories/${this.story_id}/blockers`;
  }
}

export default StoryBlockersRequest;
