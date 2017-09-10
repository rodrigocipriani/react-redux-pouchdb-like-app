import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import config from '../../config';

import RealTimeContainer from './RealTime/RealTime';
import LoginPage from './Auth/LoginPage';
import SignUpPage from './Auth/SignUpPage';
import LogoutPage from './Auth/LogoutPage';
import NotFoundPage from './NotFound/NotFoundPage';

const publicPath = config.urls.subApp ? `${config.urls.subApp}` : '';

const HOME_PATH = `${publicPath}/`;

export const routes = {
  HOME: {
    path: HOME_PATH,
  },
  LOGIN: {
    path: `${publicPath}/login`,
    component: () => <LoginPage returnTo={ HOME_PATH }/>,
  },
  LOGOUT: {
    path: `${publicPath}/logout`,
    component: () => <LogoutPage returnTo={ HOME_PATH }/>,
  },
  SIGNUP: {
    path: `${publicPath}/signup`,
    component: () => <SignUpPage returnTo={ HOME_PATH }/>,
  },
  EXTRATO: {
    path: `${publicPath}/extrato`,
    component: RealTimeContainer,
  },
  NOT_FOUND: {
    path: '*',
    component: NotFoundPage,
  },
};

export const PUBLIC_ROUTES = [
  routes.LOGIN.path,
  routes.LOGOUT.path,
  routes.SIGNUP.path,
];

class Router extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from='/' to={ routes.EXTRATO.path }/>
        <Route { ...routes.EXTRATO }/>
        <Route { ...routes.LOGIN }/>
        <Route { ...routes.SIGNUP }/>
        <Route { ...routes.LOGOUT }/>
        <Route { ...routes.NOT_FOUND }/>
      </Switch>
    );
  }
}

Router.propTypes = {};

Router.defaultProps = {};

export default Router;
