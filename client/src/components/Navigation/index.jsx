import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system';
import Sidebar from 'react-sidebar';
import AppBar from 'material-ui/AppBar';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ImageAvatar from './ImageAvatar';

const LARGE_SCREEN_WIDTH = 933;

const styleSheet = theme => ({
  NavigationSideBar: {
    width: 290,
  },
  flex: {
    flex: 1,
  },
  backgroundCover: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  avatarInfo: {
    color: '#ffffff',
    background: 'rgba(0, 0, 0, 0.3)',
    paddingTop: 8,
    paddingBottom: 8,
  },
  avatarImage: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});

class Navigation extends PureComponent {
  constructor(props) {
    super(props);

    const isLargeScreen = screen.width >= LARGE_SCREEN_WIDTH;

    this.state = {
      isLargeScreen,
      isOpen: isLargeScreen,
      width: 0,
    };
  }

  handleToggle = () => this.setState({ isOpen: !this.state.isOpen });

  // utilizar metodos abaixo caso queira controlar onResize
  // componentWillMount() {
  //   this.updateDimensions();
  // }
  // componentDidMount() {
  //   window.addEventListener('resize', this.updateDimensions);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateDimensions);
  // }
  //
  // updateDimensions() {
  //   console.log('loucura loucura', screen.width);
  //   // this.setState({ width: screen.width });
  // }

  render() {
    const {
      children,
      topMenuTitle,
      topMenuContent,
      sideMenu,
      avatarImg,
      avatarTitle,
      avatarSubTitle,
      sideMenuHeaderBg,
      sideMenuFooter,
      classes,
    } = this.props;
    const { isOpen, isLargeScreen } = this.state;

    return (
      <div className="Navigation">
        <Sidebar
          sidebar={
            <div className={classes.NavigationSideBar}>
              <div
                className={classes.backgroundCover}
                style={{ backgroundImage: `url(${sideMenuHeaderBg})` }}
              >
                <Container className={classes.avatarImage}>
                  <Row>
                    <Col xs={12}>
                      <ImageAvatar src={avatarImg}>U</ImageAvatar>
                    </Col>
                  </Row>
                </Container>
                <Container className={classes.avatarInfo}>
                  <Row>
                    <Col xs={12}>
                      <Typography type="body1" style={{ color: '#ffffff' }}>
                        {avatarTitle}
                        <br />
                        {avatarSubTitle}
                      </Typography>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div>{sideMenu}</div>
              <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <div style={{ width: '100%', textAlign: 'right' }}>{sideMenuFooter}</div>
              </div>
            </div>
          }
          styles={{ sidebar: { backgroundColor: '#ffffff' } }}
          docked={isLargeScreen && isOpen}
          sidebarClassName="NavigationSideBar"
          open={isOpen}
          onSetOpen={state => this.setState({ isOpen: state })}
        >
          <div className="NavigationTopBar">
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={this.handleToggle} color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                  {topMenuTitle}
                </Typography>
                {topMenuContent}
              </Toolbar>
            </AppBar>
          </div>

          <div className="NavigationContent">{children}</div>
        </Sidebar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
  showNavigation: PropTypes.bool,
  sideMenu: PropTypes.any,
  topMenuTitle: PropTypes.any,
  topMenuContent: PropTypes.any,
  sideMenuTitle: PropTypes.any,
  sideMenuFooter: PropTypes.any,
  sideMenuHeaderBg: PropTypes.string,
  avatarImg: PropTypes.string,
  avatarTitle: PropTypes.string,
  avatarSubTitle: PropTypes.string,
};

Navigation.defaultProps = {
  children: null,
  showNavigation: false,
  topMenuTitle: '',
  topMenuContent: '',
  sideMenuTitle: '',
  sideMenuFooter: null,
  sideMenu: null,
  sideMenuHeaderBg: '',
  avatarImg: '',
  avatarTitle: '',
  avatarSubTitle: '',
};

export default withStyles(styleSheet)(Navigation);
