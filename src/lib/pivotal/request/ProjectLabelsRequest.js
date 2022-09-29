import Request from "./Request";

class ProjectLabelsRequest extends Request {
  constructor(client, project_id) {
    super(client);
    this.project_id = project_id;
  }

  uri() {
    return `/projects/${this.project_id}/labels`;
  }
}

export default ProjectLabelsRequest;
