import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class Message extends PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.message !== nextProps.message;
  }

  render() {
    const { message } = this.props;

    let messageText = null;
    if (message) {
      messageText = message;
      if (typeof messageText !== 'string') {
        messageText = messageText.text;
      }
    }
    const isOpenMessages = !!messageText;

    return (
      <div>
        {/* <SnackBarMsgs msgs={ messages }/>*/}
        { isOpenMessages &&
          <Snackbar
            open={ isOpenMessages }
            message={ messageText }
          />
      }
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.any
};

Message.defaultProps = {
  message: null
};

export default Message;
