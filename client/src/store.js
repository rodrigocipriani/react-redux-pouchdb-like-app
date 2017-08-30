import { persistentReducer } from 'redux-pouchdb';
import storeCreator from 'es2k-helpers/storeCreator';
import config from '../config';
import { app } from './App/appReducer';
import { usuario } from './App/usuarioReducer';

console.log('config', config);

const showLoggers = false;
const isProduction = config.env.isProduction;
const couchDBName = 'condominio';
const couchDBUrlConnector = 'https://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de/condominio';

export default storeCreator({
  appStore: persistentReducer(app),
  usuarioStore: persistentReducer(usuario),
}, { isProduction, showLoggers, couchDBName, couchDBUrlConnector });
