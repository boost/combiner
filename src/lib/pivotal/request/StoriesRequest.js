import Request from './Request'

const OPTIONAL_PARAMETERS = new Set([
  'with_label',
  'with_story_type',
  'with_state',
  'after_story_id',
  'before_story_id',
  'accepted_before',
  'accepted_after',
  'created_before',
  'created_after',
  'updated_before',
  'updated_after',
  'deadline_before',
  'deadline_after',
  'limit',
  'offset',
  'filter'
])

class StoriesRequest extends Request {
  constructor(client, project_id, options = {}) {
    super(client)
    this.validateOptions(OPTIONAL_PARAMETERS, options)

    this.project_id = project_id
    this.options = options
  }

  uri() {
    return `/projects/${this.project_id}/stories`
  }
}

export default StoriesRequest