import { connect } from 'react-redux';
import { signIn, signUp, signOut } from './authAction';

export default (component) => {
  const mapStateToProps = (state) => {
    return {
      user           : state.authReducer.user,
      isAuthenticated: state.authReducer.isAuthenticated
    };
  };

  const mapDispatchToProps = () => {
    return { signIn, signUp, signOut };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
};
