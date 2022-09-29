import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from './MarkdownEditor'
import bindAll from 'lodash/bindAll'

class Activity extends Component {
  constructor(props) {
    super(props)

    this.state = {
      previewMode: true,
      previewSource: this.previewDefaultText,
      story: props.story
    }
    bindAll(this, ['handleValidSubmit'])
  }

  handleValidSubmit() {

  }

  render() {
    const comments = this.state.story.comments.map(comment => {
      const person = this.props.memberships.find(membership => membership.person.id == comment.person_id)
      const edited = comment.created_at != comment.updated_at ? ' - Edited' : ''
      const date = new Date(Date.parse(comment.updated_at))
      const dateStr = `${date.toDateString()}, ${date.toTimeString().split(' ')[0]}${edited}`
      return (
        <li key={`comment-${comment.id}`} className="cell">
          <h5>@{person.name}</h5>
          <ReactMarkdown>{comment.text}</ReactMarkdown>
          <a role="button">Copy Link</a>
          <span className="comment-date">{dateStr}</span>
        </li>
      )
    })

    return (
      <section className="activity">
        <div className="grid-x">
          <h4 className="cell auto">Activity</h4>
          <label className="cell shrink">Sort by</label>
          <select className="cell shrink">
            <option value="asc">Oldest to newest</option>
            <option value="desc">Newest to oldest</option>
          </select>
        </div>
        <ul className="comments grid-x">
          {comments}
        </ul>
        <MarkdownEditor
          id='comment'
          onValidSubmit={this.handleValidSubmit}
        />
      </section>
    )
  }
}

Activity.propTypes = {
  story: PropTypes.object,
  memberships: PropTypes.array
}

export default Activity
