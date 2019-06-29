import React, { Component } from 'react';
import { buildOwnersList, buildPossibleOwnersList } from 'utils/pivotal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bindAll from 'lodash/bindAll';

class Owners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: buildPossibleOwnersList(props.memberships),
      owners: buildOwnersList(props.memberships, props.story.owner_ids)
    };

    bindAll(this, [
      'handleAddition',
      'handleDeletion',
      'handleAddClick'
    ]);
  }

  handleAddClick() {

  }

  handleAddition(event) {

  }

  handleDeletion(event) {

  }

  render() {
    const { people, owners } = this.state;
    return (
      <div className="owners">
        { owners.map(owner => <span className='badge' key={owner.id}>{owner.initials.toUpperCase()}</span>) }
        <button onClick={this.handleAddClick}><FontAwesomeIcon icon="plus" /></button>
      </div>
    );
  }
}

export default Owners;
