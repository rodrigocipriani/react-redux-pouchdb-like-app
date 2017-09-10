import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import authConnector from './authConnector';

class LogoutPage extends Component {

  render() {
    const { signOut, returnTo } = this.props;

    signOut();
    return <Redirect to={ returnTo }/>;
  }

}

LogoutPage.propTypes = {
  signOut : PropTypes.func.isRequired,
  returnTo: PropTypes.string.isRequired
};

LogoutPage.defaultProps = {
  signOut : null,
  returnTo: '/'
};

export default authConnector(LogoutPage);
