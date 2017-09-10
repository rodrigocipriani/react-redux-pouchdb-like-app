import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import LoginForm from './components/LoginForm.jsx';
import authConnector from './authConnector';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user  : {
        email   : '',
        password: ''
      }
    };
  }

  processForm = (event) => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const email    = this.state.user.email;
    const password = this.state.user.password;

    this.props.signIn(email, password);
  };

  changeUser = (event) => {
    const field = event.target.name;
    const user  = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  };

  render() {
    const { isAuthenticated, returnTo } = this.props;

    if (isAuthenticated) {
      // todo: Colocar para receber da url uma pagina de retorno. Caso não tenha vai para /
      return <Redirect to={ returnTo }/>;
    }

    return (
      <Grid container justify='center' align='center'>
        <Grid item xs={ 12 } sm={ 10 } md={ 6 }>
          <br/><br/>
          <LoginForm
            onSubmit={ this.processForm }
            onChange={ this.changeUser }
            errors={ this.state.errors }
            user={ this.state.user }
          />
        </Grid>
      </Grid>
    );
  }

}

LoginPage.propTypes = {
  signIn         : PropTypes.func.isRequired,
  returnTo       : PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool
};

LoginPage.defaultProps = {
  signIn         : null,
  returnTo       : '/',
  isAuthenticated: false
};

export default authConnector(LoginPage);
