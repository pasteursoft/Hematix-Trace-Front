import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/css/layout/layout.css';
import '../src/assets/css/font/font.css';
import '../src/assets/css/styles/styles.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

import configureStore from './redux/store';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
