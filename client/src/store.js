import { persistentReducer } from 'redux-pouchdb';
import storeCreator from 'es2k-helpers/storeCreator';
import config from '../../config';
import realTime from './RealTime/realTimeReducer';

console.log('config', config);

const showLoggers = false;
const isProduction = config.env.isProduction;
const couchDBName = config.couchDB.dBname;
const couchDBUrlConnector = config.couchDB.urlConnector;

export default storeCreator({
  realTimeStore: persistentReducer(realTime),
}, { isProduction, showLoggers, couchDBName, couchDBUrlConnector });
