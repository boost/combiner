import Request from './Request'

const OPTIONAL_PARAMETERS = new Set([
  'offset',
  'label',
  'limit',
  'scope'
])

class IterationsRequest extends Request {
  constructor(client, project_id, options = {}) {
    super(client)
    this.validateOptions(OPTIONAL_PARAMETERS, options)

    this.project_id = project_id
    this.options = options
  }

  uri() {
    return `/projects/${this.project_id}/iterations`
  }
}

export default IterationsRequest