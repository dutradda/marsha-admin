import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './config';

document.title = config.title;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
