import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PivotalTokenForm from './components/PivotalTokenForm';

const domContainer = document.querySelector('#root');

ReactDOM.render(React.createElement(PivotalTokenForm), domContainer);