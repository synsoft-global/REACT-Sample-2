import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../../redux';
import PricingForm from './PricingForm';
import { BrowserRouter as Router } from 'react-router-dom'

it('renders without crashing', () => {
  const div   = document.createElement('div');
  const match = {params: {userId: ""}};

  const app =
    <Provider store={store}>
        <Router store={store}>
            <PricingForm match={match}/>
        </Router>
    </Provider>;
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
