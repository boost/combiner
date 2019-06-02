import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './scss/popup.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faBookOpen, faCogs } from '@fortawesome/free-solid-svg-icons';

library.add(faFolder, faBookOpen, faCogs);

const domContainer = document.querySelector('#root');

ReactDOM.render(React.createElement(Root), domContainer);
