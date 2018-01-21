import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './app';
import './reset.css';
import './layout.css';
import './typography.css';
import './utils/utils.css';
import './main.css';

if (process.env.REACT_APP_MOCK === 'true') {
    require('./mock');
}

ReactDOM.render(<Application />, document.getElementById('root') as HTMLElement);