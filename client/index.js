import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/bootstrap.css';
import Root from './components/root';


ReactDOM.render(
    <Root/>,
    document.getElementById('content')
);
