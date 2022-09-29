import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Blockers extends Component {
  render() {
    return (
      <section className="blockers">
        <h4>Blockers</h4>
        <div className="add-blocker">
          <FontAwesomeIcon icon="plus" />
          <span className="add-blocker-message">Add blocker or impediment</span>
        </div>
      </section>
    );
  }
}

export default Blockers;
