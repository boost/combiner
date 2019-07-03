import Request from './Request';

class ProjectsRequest extends Request {
  uri() {
    return '/projects';
  }
}

export default ProjectsRequest;
