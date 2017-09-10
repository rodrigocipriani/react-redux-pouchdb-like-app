import api from 'es2k-helpers/api';
import { authActionTypes } from './authActionTypes';
import config from '../../../config';
import store from '../store';

const apiGeral = api(config.urls.api);

export const signUp = (username, email, password) => {
  store.createAssyncAction(authActionTypes.SIGNUP,
    apiGeral.post('/usuario', { username, email, password }),
    {}
  );
};

export const signIn = (email, password) => {
  store.createAssyncAction(authActionTypes.SIGNIN,
    apiGeral.post('/Autenticacao', { email, password })
  );
};

export const signOut = () => {
  store.createAssyncAction(authActionTypes.SIGNOUT,
    apiGeral.get('/Autenticacao')
  );
};
