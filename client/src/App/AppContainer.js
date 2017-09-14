import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import BodyContainer from 'es2k-react-components/material/components/Body';
import Routes, { PUBLIC_ROUTES, routes } from '../Router';
import appConnector from './appConnector';
import authConnector from '../Auth/authConnector';
import LoggedTemplate from './LoggedTemplate';


class AppContainer extends Component {

  isAuthNeeded = () => PUBLIC_ROUTES.indexOf(this.props.history.location.pathname) < 0;

  render() {
    const { message, user, isAuthenticated } = this.props;

    if (this.isAuthNeeded() && !isAuthenticated) {
      return <Redirect to={ routes.LOGIN.path }/>;
    }

    return (
      <BodyContainer message={ message }>
        <LoggedTemplate usuario={ user }>
          <Routes/>
        </LoggedTemplate>
      </BodyContainer>
    );
  }
}

AppContainer.propTypes = {
  message: PropTypes.any,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

AppContainer.defaultProps = {
  message: null,
  user: {},
  isAuthenticated: null,
};

export default withRouter(
  appConnector(
    authConnector(
      AppContainer,
    ),
  ),
);
