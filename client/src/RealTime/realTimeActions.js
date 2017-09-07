import api from 'es2k-helpers/api';
import config from '../../../config';
import { realTimeActionTypes } from './realTimeActionTypes';

const realTimeApi = api(config.urls.api);


export const add = total => ({
  type: realTimeActionTypes.ADD,
  payload: total,
});

export const addText = text => ({
  type: realTimeActionTypes.ADD_TEXTO,
  payload: text,
});

export const reset = () => ({
  type: realTimeActionTypes.RESET_TOTAL,
  promise: realTimeApi.get('/reset'),
});

export const criarListaServer = tamanho => ({
  type: realTimeActionTypes.CRIAR_LISTA_SERVER,
  promise: realTimeApi.get(`/criarlista/server/${tamanho}`),
});

export const criarListaClassic = tamanho => ({
  type: realTimeActionTypes.CRIAR_LISTA_CLASSIC,
  promise: realTimeApi.get(`/criarlista/classic/${tamanho}`),
});

export const criarListaClient = () => ({
  type: realTimeActionTypes.CRIAR_LISTA_CLIENT,
});
