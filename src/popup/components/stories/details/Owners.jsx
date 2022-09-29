import React, { Component } from "react";
import PropTypes from "prop-types";
import { buildOwnersList, buildPossibleOwnersList } from "utils/pivotal";
import Select, { components } from "react-select";

class Owners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: buildPossibleOwnersList(props.memberships),
      owners: buildOwnersList(props.memberships, props.story.owner_ids),
    };
  }

  render() {
    const { people, owners } = this.state;
    const options = people.map((person) => {
      return {
        value: person.id,
        label: person.name,
        initials: person.initials.toUpperCase(),
      };
    });
    const defaultOptions = owners.map((owner) => {
      return {
        value: owner.id,
        label: owner.name,
        initials: owner.initials.toUpperCase(),
      };
    });

    const MultiValue = (props) => (
      <components.MultiValue {...props}>
        {props.data.initials}
      </components.MultiValue>
    );

    return (
      <div className="grid-x row">
        <label className="cell auto">OWNERS</label>
        <div className="cell shrink">
          <Select
            defaultValue={defaultOptions}
            isMulti
            name="owners"
            components={{ MultiValue }}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      </div>
    );
  }
}

Owners.propTypes = {
  memberships: PropTypes.array,
  story: PropTypes.object,
};

export default Owners;
