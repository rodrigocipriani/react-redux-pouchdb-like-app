import { realTimeActionTypes } from './realTimeActionTypes';

const initialState = {
  total: 0,
  texto: '',
  teste: 1,
  biglist: [{ id: 0, nome: 'item 0' }],
};

const actionsMap = {

  [realTimeActionTypes.ADD]: (state, action) => {
    const total = action.payload ? parseInt(action.payload, 0) : state.total + 1;
    return { ...state, total };
  },

  [realTimeActionTypes.ADD_TEXTO]: (state, action) => {
    const text = action.payload ? action.payload : state.text;
    return { ...state, text };
  },

  [realTimeActionTypes.CRIAR_LISTA_CLIENT]: (state, action) => {
    const biglist = [];
    for (let i = 0; i < state.total; i++) {
      biglist.push({
        id: i,
        nome: `item ${i}`,
      });
    }
    return { ...state, biglist };
  },

  [realTimeActionTypes.CRIAR_LISTA_CLASSIC]: (state, action) => {
    if (action.ready) {
      const biglist = action.result.data;
      return { ...state, biglist };
    }
    return state;
  },

  [realTimeActionTypes.RESET_TOTAL]: (state, action) => state,

};

const realTime = (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};

export default realTime;
