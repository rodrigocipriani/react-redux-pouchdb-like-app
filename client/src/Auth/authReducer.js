import { authActionTypes } from './authActionTypes';

const initialState = {
  // user: null,
  user: {
    id: 1,
    nome: 'Rodrigo Cipriani da Rosa',
    senha: '',
    email: 'chopsss@gmail.com',
    situacao: 1,
    criacao: '2017-07-18T03:40:26.000Z',
    foto: null,
    tipo: 0,
  },
  // isAuthenticated: false,
  isAuthenticated: true,
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
    if (action.ready) {
      const user = action.result.data;
      // if (action.complete) {
      //   return gravarUsuario(user, state);
      // }
      return { ...state, isAuthenticated: !!user, user };
    }
    return state;
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
