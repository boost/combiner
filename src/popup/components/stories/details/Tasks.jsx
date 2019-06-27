import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tasks extends Component {

  render() {
    return (
      <section className="tasks">
        <h4>Tasks (0/0)</h4>
        <div className="add-task">
          <FontAwesomeIcon icon="plus" />
          <span className="add-task-message">Add a task</span>
        </div>
      </section>
    );
  }
}

export default Tasks;
