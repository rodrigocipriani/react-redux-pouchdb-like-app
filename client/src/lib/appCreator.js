import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router } from 'react-router-dom';
import 'babel-polyfill';
import { whyDidYouUpdate } from 'why-did-you-update';
// const { whyDidYouUpdate } = require('why-did-you-update');
const customHistory = createBrowserHistory();

export default (App, store, props = {}) => {
  const rootContainer = props.rootContainer || 'root';
  const isProduction = props.isProduction !== null ? props.isProduction : true;
  const isWhyDidYouUpdate = props.whyDidYouUpdate !== null ? props.whyDidYouUpdate : true;

  if (!isProduction && isWhyDidYouUpdate) {
    whyDidYouUpdate(React);
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={customHistory}>
        {isProduction ? (
          <App />
        ) : (
          <div>
            <App />
            {/* <div>Desenvolvimento</div> */}
          </div>
        )}
      </Router>
    </Provider>,
    document.getElementById(rootContainer),
  );
};
