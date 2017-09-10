import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, onChange, errors, user }) => (

  <form action='/' onSubmit={ onSubmit }>
    <Card>
      <CardHeader
        title='Entrar'
        subheader={ <p>Ainda não tem uma conta? <Link to={ '/signup' }>Criar conta</Link></p> }
      />
      <CardContent>

        {errors.summary && <p className='error-message'>{errors.summary}</p>}

        <Grid container justify='center' align='center'>
          <Grid item xs={ 12 }>
            <TextField
              name='email'
              label='E-Mail'
              InputProps={ {
                placeholder: 'E-Mail',
                value      : user.email,
                onChange
              } }
              helperText=''
              fullWidth
            />
          </Grid>
          <Grid item xs={ 12 }>

            <TextField
              name='password'
              label='Senha'
              type='password'
              InputProps={ {
                placeholder: 'Senha',
                value      : user.password,
                onChange
              } }
              helperText=''
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button raised color='primary' type='submit'>Entrar</Button>
      </CardActions>
    </Card>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors  : PropTypes.object.isRequired,
  user    : PropTypes.object.isRequired
};

export default LoginForm;
