import { connect } from 'react-redux';

export default (component) => {
  const mapStateToProps = (state) => {
    return {
      message: state.appReducer.message
    };
  };

  return connect(
    mapStateToProps
  )(component);
};
