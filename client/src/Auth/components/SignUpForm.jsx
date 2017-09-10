import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';


const SignUpForm = ({ onSubmit, onChange, errors, user }) => (

  <form action='/' onSubmit={ onSubmit }>
    <Card>
      <CardHeader
        title='Criar nova conta'
        subheader={ <p>Já tem uma conta? <Link to={ '/login' }>Entrar</Link></p> }
      />
      <CardContent>

        {errors.summary && <p className='error-message'>{errors.summary}</p>}

        <Grid container justify='center' align='center'>
          <Grid item xs={ 12 }>
            <TextField
              name='name'
              label='Nome'
              InputProps={ {
                placeholder: 'Digite seu nome',
                value      : user.name,
                onChange
              } }
              helperText=''
              fullWidth
            />
          </Grid>
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
        <Button raised color='primary' type='submit'>Criar nova conta</Button>
      </CardActions>
    </Card>
  </form>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors  : PropTypes.object.isRequired,
  user    : PropTypes.object.isRequired
};

export default SignUpForm;
