import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import SignUpForm from './components/SignUpForm.jsx';
import authConnector from './authConnector';

class SignUpPage extends Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user  : {
        email   : '',
        name    : '',
        password: ''
      }
    };
  }

  changeUser = (event) => {
    const field = event.target.name;
    const user  = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  };

  processForm = (event) => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const name     = this.state.user.name;
    const email    = this.state.user.email;
    const password = this.state.user.password;
    this.props.signUp(name, email, password);
  };

  render() {
    const { isAuthenticated, returnTo } = this.props;

    if (isAuthenticated) {
      // todo: Colocar para receber da url uma pagina de retorno. Caso não tenha vai para /
      return <Redirect to={ returnTo }/>;
    }

    return (
      <Grid container justify='center' align='center'>
        <Grid item xs={ 12 } sm={ 10 } md={ 6 } >
          <br/><br/>
          <SignUpForm
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

SignUpPage.propTypes = {
  signUp         : PropTypes.func.isRequired,
  returnTo       : PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool
};

SignUpPage.defaultProps = {
  signUp         : null,
  returnTo       : '/',
  isAuthenticated: null
};

export default authConnector(SignUpPage);
