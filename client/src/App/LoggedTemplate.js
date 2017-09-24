import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Navigation from '../components/Navigation';
import MenuLateral from './components/MenuLateral';
import bgMenuLateral from './hacker.jpg';

class LoggedTemplate extends Component {
  openAddPonto = () => {
    console.log('abrir tela');
  };

  render() {
    const { children, usuario } = this.props;

    if (!usuario) {
      return <div>{children}</div>;
    }

    return (
      <Navigation
        topMenuTitle="Like app"
        topMenuContent={<Button color="contrast">Login</Button>}
        sideMenu={<MenuLateral />}
        sideMenuTitle="Like app"
        sideMenuHeaderBg={bgMenuLateral}
        avatarImg="http://then.gasbuddy.com/images/default_avatar.gif"
        avatarTitle={usuario.nome}
        avatarSubTitle={usuario.email}
        sideMenuFooter={<span style={{ color: '#999999' }}>v 0.0.1</span>}
      >
        <div>
          <div>{children}</div>

          {/* <FabButton
            options={ [
              {
                label: 'Adicionar novo ponto',
                fabContent: <i className='fa fa-plus' aria-hidden='true'/>,
                onTouchTap: this.openAddPonto,
              },
            ] }
          /> */}
        </div>
      </Navigation>
    );
  }
}

LoggedTemplate.propTypes = {
  children: PropTypes.any,
  usuario: PropTypes.object.isRequired,
};

LoggedTemplate.defaultProps = {
  children: null,
  usuario: null,
};

export default LoggedTemplate;
