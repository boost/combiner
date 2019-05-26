import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import './scss/popup.scss';

const domContainer = document.querySelector('#root');

ReactDOM.render(React.createElement(Root), domContainer);