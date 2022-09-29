/* eslint-disable */
import React, { Component } from "react";
import bindAll from "lodash/bindAll";
import Select from "react-select";

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpened: false,
    };

    bindAll(this, ["handleSelect"]);
  }

  handleSelect(event) {
    console.log("handleSelect");
  }

  render() {
    const { id, name, initials } = this.props.owner;
    const isOpened = this.state.dropdownOpened ? " is-open" : "";

    return (
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    );
  }
}

export default Owner;
