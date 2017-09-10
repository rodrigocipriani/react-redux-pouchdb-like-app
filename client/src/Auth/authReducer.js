import { authActionTypes } from './authActionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
};

// const gravarUsuario = (user, state) => {
//   if (user) {
//     Auth.authenticateUser(user);
//   } else {
//     Auth.deauthenticateUser();
//   }
//
//   return { ...state, isAuthenticated: !!user, user };
// };

const actionsMap = {

  [authActionTypes.SIGNIN]: (state, action) => {
    const user = action.payload;
    // if (action.complete) {
    //   return gravarUsuario(user, state);
    // }
    return { ...state, isAuthenticated: !!user, user };
  },

  [authActionTypes.SIGNUP]: (state, action) => {
    const user = action.payload;
    // return gravarUsuario(user, state);
    return { ...state, isAuthenticated: !!user, user };
  },

  // [authActionTypes.SIGNOUT]: (state, action) => gravarUsuario(null, state),
  //
  // todo : tratar isso
  // [storeActionTypes.REQUEST_ERROR]: (state, action) => {
  //   if (
  //     action.payload && action.payload.error && action.payload.error.response && action.payload.error.response.data &&
  //     action.payload.error.response.data.authError === 'NOT_AUTHENTICATED'
  //   ) {
  //     return gravarUsuario(null, state);
  //   }
  //   return { ...state };
  // },
};

const auth = (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
};

export default auth;
