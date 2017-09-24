import { persistentReducer } from 'redux-pouchdb';
import storeCreator from 'es2k-helpers/storeCreator';
import config from '../../config';
import realTime from './RealTime/realTimeReducer';
import appReducer from './App/appReducer';
import authReducer from './Auth/authReducer';

console.log('config', config);

const showLoggers = false;
const isProduction = config.env.isProduction;
const couchDBName = config.couchDB.dBname;
const couchDBUrlConnector = config.couchDB.urlConnector;

export default storeCreator(
  {
    appReducer,
    authReducer,
    realTimeStore: persistentReducer(realTime),
  },
  { isProduction, showLoggers, couchDBName, couchDBUrlConnector },
);
