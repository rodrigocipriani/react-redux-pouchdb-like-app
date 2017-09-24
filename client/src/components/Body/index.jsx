import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from './DefaultTheme';
import Body from './Body';
import Message from './Message';

class BodyContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const { children, message } = this.props;

    return (
      <DefaultTheme>
        <div className='BodyContainer'>
          <Body>{children}</Body>
          <Message message={ message }/>
        </div>
      </DefaultTheme>
    );
  }
}

BodyContainer.propTypes = {
  children: PropTypes.element, // todo : Implementar apra ser element ou string
  message : PropTypes.any
};

BodyContainer.defaultProps = {
  children: null,
  message : null
};

export default BodyContainer;
