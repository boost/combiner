import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handlePivotalClick = this.handlePivotalClick.bind(this);
    this.handleUtilsClick = this.handleUtilsClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  handleTabClick() {
    this.props.onTabClick("tab");
  }

  handlePivotalClick() {
    this.props.onTabClick("pivotal");
  }

  handleUtilsClick() {
    this.props.onTabClick("utils");
  }

  handleSettingsClick() {
    this.props.onTabClick("settings");
  }

  render() {
    const active = this.props.active;
    return (
      <nav className="bottom-nav">
        <ul className="bottom-nav__list no-bullet">
          <li
            className={`bottom-nav__item ${active == "tab" ? "active" : ""}`}
            onClick={this.handleTabClick}
          >
            <FontAwesomeIcon size="2x" icon="folder" />
            <span>My stories</span>
          </li>
          <li
            className={`bottom-nav__item ${
              active == "pivotal" ? "active" : ""
            }`}
            onClick={this.handlePivotalClick}
          >
            <FontAwesomeIcon size="2x" icon="book-open" />
            <span>Iteration</span>
          </li>
          <li
            className={`bottom-nav__item ${active == "utils" ? "active" : ""}`}
            onClick={this.handleUtilsClick}
          >
            <FontAwesomeIcon size="2x" icon="sticky-note" />
            <span>Utils</span>
          </li>
          <li
            className={`bottom-nav__item ${
              active == "settings" ? "active" : ""
            }`}
            onClick={this.handleSettingsClick}
          >
            <FontAwesomeIcon size="2x" icon="cogs" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    );
  }
}

Footer.propTypes = {
  onTabClick: PropTypes.func,
  active: PropTypes.bool,
};

export default Footer;
