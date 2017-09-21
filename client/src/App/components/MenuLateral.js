import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AttachMoney from 'material-ui-icons/AttachMoney';
import HighlightOff from 'material-ui-icons/HighlightOff';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Typography from 'material-ui/Typography';
import { routes } from '../../Router';

class MenuLateral extends Component {

  render() {
    return (
      <List style={{backgroundColor: '#ffffff'}}>

        <Link to={ routes.EXTRATO.path }>
          <ListItem button>
            <ListItemIcon>
              <AttachMoney/>
            </ListItemIcon>
            <ListItemText primary='Extrato'/>
          </ListItem>
        </Link>

        <Link to={ 'teste' }>
          <ListItem button>
            <ListItemIcon>
              <HighlightOff/>
            </ListItemIcon>
            <ListItemText primary='Teste 404'/>
          </ListItem>
        </Link>

        <Divider/>

        <Link to={ routes.LOGOUT.path }>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp/>
            </ListItemIcon>
            <ListItemText primary='Sair'/>
          </ListItem>
        </Link>
      </List>
    );
  }
}

export default MenuLateral;
