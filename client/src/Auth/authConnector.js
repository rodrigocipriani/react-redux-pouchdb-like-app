import { connect } from 'react-redux';
import * as authAction from './authAction';

export default (component) => {
  const mapStateToProps = (state) => ({
      user           : state.authReducer.user,
      isAuthenticated: state.authReducer.isAuthenticated
    });

  const mapDispatchToProps = (dispatch) => {
    return {
      signIn(email, password) {
        dispatch(authAction.signIn(email, password));
      },
      signUp(username, email, password) {
        dispatch(authAction.signUp(username, email, password));
      },
      signOut() {
        dispatch(authAction.signOut());
      },
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
};
