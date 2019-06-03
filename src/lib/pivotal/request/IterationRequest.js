import Request from './Request';

const OPTIONAL_PARAMETERS = new Set([
  'label'
]);

class IterationRequest extends Request {
  constructor(client, project_id, iteration_number, options = {}) {
    super(client);
    this.validateOptions(OPTIONAL_PARAMETERS, options);

    this.project_id = project_id;
    this.iteration_number = iteration_number;
    this.options = options;
  }

  uri() {
    return `/projects/${this.project_id}/iterations/${this.iteration_number}`;
  }
}

export default IterationRequest;