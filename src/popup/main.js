import Root from "./components/Root";
import React from "react";
import { createRoot } from "react-dom/client";
import "./scss/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import "utils/harvest_init";
import "utils/harvest_platform";
import {
  faFolder,
  faBookOpen,
  faCogs,
  faStickyNote,
  faTimes,
  faFileSignature,
  faClock,
  faLink,
  faPlus,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

const search = window.location.search;
if (
  search !== "" &&
  (search.indexOf("uilocation=tab") > -1 ||
    search.indexOf("uilocation=popout") > -1)
) {
  window.document.body.classList.add("body-full");
}

// React
library.add(
  faFolder,
  faBookOpen,
  faCogs,
  faStickyNote,
  faTimes,
  faFileSignature,
  faClock,
  faLink,
  faPlus,
  faExternalLinkAlt
);
const domContainer = document.getElementById("root");
const root = createRoot(domContainer);
root.render(<Root />);
