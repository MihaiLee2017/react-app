import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter'
import './static/css/index.scss'

ReactDOM.render(
    <AppRouter />,
    document.getElementById('root'));
registerServiceWorker();
