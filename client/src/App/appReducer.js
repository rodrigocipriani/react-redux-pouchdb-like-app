// import { reducerCreator, storeActionTypes } from 'es2x/helpers';

const initialState = {
  message: null
};

const actionsMap = {

  // todo:  corrigir isto
  // [storeActionTypes.REQUEST_ERROR]: (state, action) => {
  //   const payload = action.payload;
  //
  //   /*
  //   * error handling
  //   * */
  //   let message = null;
  //   if (payload.error && payload.error.response && payload.error.response.data
  //       && payload.error.response.data.message) {
  //     message = payload.error.response.data.message;
  //   } else {
  //     message = {
  //       type: 'error',
  //       text: payload.message ? payload.message : payload.error.message
  //     };
  //   }
  //
  //   return { ...state, message };
  // }
};

const app = (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};

export default app;
