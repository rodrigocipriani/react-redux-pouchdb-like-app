'use strict';

const defaultConfig = require('./ambiente/default');
const development   = require('./ambiente/development');
const local         = require('./ambiente/local');


const env = {
  isLocal      : false,
  isDevelopment: false,

};

const ambiente = process.env.NODE_ENV || '';

let retorno = {};

switch (ambiente) {
  case 'development':
    env.isDevelopment = true;
    retorno           = development;
    break;
  default:
    // case 'local':
    env.isLocal = true;
    retorno     = local;
    break;
}


retorno.env = env;

module.exports = { ...defaultConfig, ...retorno };

