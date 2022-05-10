import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../redux';
import Users from './Users';
import { BrowserRouter as Router } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const app =
    <Provider store={store}>
        <Router store={store}>
            <Users/>
        </Router>
    </Provider>;
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
