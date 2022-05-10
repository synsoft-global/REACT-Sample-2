import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from 'react-redux';
import store from './redux';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

Sentry.init({
    dsn: "",
    integrations: [new BrowserTracing()],
    environment: process.env.NODE_ENV,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.75,
});

ReactDOM.render(
    <Provider store={store}>
        <Router store={store}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
