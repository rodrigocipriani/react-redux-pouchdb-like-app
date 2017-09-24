import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Body extends PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.children !== nextProps.children;
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

Body.propTypes = {
  children: PropTypes.element
};

Body.defaultProps = {
  children: null
};

export default Body;
