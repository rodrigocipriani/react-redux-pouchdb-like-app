/*  */import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

console.log('222222222 createStyleSheet', createStyleSheet);

const styleSheet = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'left',
  },
  avatar: {
    backgroundColor: '#fff',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
  },
  avatarText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '200%',
  },
});

const ImageAvatars = ({ size, src, alt, classes, children }) => (
  <div className={ classes.row }>
    <div
      alt={ alt }
      style={ { backgroundImage: `url(${src})`, width: size, height: size } }
      className={ classes.avatar }
    >
      {!src &&
          <div className={ classes.avatarText }>
            <Typography type='display1'>
              {children}
            </Typography>
          </div>
      }
    </div>
  </div>
)
    ;

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.any,
};

ImageAvatars.defaultProps = {
  src: '',
  alt: '',
  size: 60,
};

export default withStyles(styleSheet)(ImageAvatars);
