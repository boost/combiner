import Request from './Request'

class ProjectTemplatesRequest extends Request {
  constructor(client, project_id) {
    super(client)
    this.project_id = project_id
  }

  uri() {
    return `/projects/${this.project_id}?fields=story_templates`
  }
}

export default ProjectTemplatesRequest
