import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './scss/popup.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFolder,
  faBookOpen,
  faCogs,
  faStickyNote,
  faTimes,
  faFileSignature,
  faClock } from '@fortawesome/free-solid-svg-icons';

if (window.location.search !== '' && window.location.search.indexOf('uilocation=sidebar') > -1) {
  window.document.body.classList.add('body-full');
}

// React
library.add(faFolder, faBookOpen, faCogs, faStickyNote, faTimes, faFileSignature, faClock);
const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Root), domContainer);
