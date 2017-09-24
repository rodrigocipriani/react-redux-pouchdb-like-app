import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultTheme extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className='DefaultTheme'>
        {children}
      </div>
    );
  }
}

DefaultTheme.propTypes = {
  children: PropTypes.element
};

DefaultTheme.defaultProps = {
  children: null
};

export default DefaultTheme;
