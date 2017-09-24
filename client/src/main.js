import 'babel-polyfill';
import React from 'react';
import appCreator from './lib/appCreator';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'normalize.css';
import './main.css';
import App from './App/AppContainer';
import config from '../../config';

console.log('store', store);

appCreator(App, store, {
  rootContainer: 'app',
  isProduction: config.env.isProduction,
  isWhyDidYouUpdate: true,
});
