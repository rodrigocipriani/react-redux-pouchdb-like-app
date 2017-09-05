import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'es2k-react-components/material/style/Typography';
import Button from 'es2k-react-components/material/components/Button';
import TextField from 'es2k-react-components/material/components/TextField';
import * as appActions from './appActions';
import BigListComponent from './BigListComponent';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class App extends PureComponent {

  render() {
    const {
      total, add, addText, text, reset, biglist, criarListaServer,
      criarListaClassic, criarListaClient, classes,
    } = this.props;


    return (
      <div className={classes.root}>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography type="display2" gutterBottom> React App</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button onClick={() => add(null)} raised color="primary">
              Add 1 (Client)
            </Button>
            <Button onClick={reset} raised color="primary">
              Zerar contador (Server)
            </Button>
          </Grid>

          <Grid item xs={12}>
            <div>Total: {total}</div>
          </Grid>

          <Grid item xs={12}>

            <TextField onChange={e => add(e.target.value)} value={total}/>

          </Grid>

          <Grid item xs={12}>

            <TextField label="Text" onChange={e => addText(e.target.value)} value={text}/>

          </Grid>

          <Grid item xs={12}>

            <Button onClick={() => criarListaClassic(total)} raised color="primary">
              Criar lista (Classic)
            </Button>

            <Button onClick={() => criarListaServer(total)} raised color="primary">
              Criar lista (Server)
            </Button>

            <Button onClick={() => criarListaClient()} raised color="primary">
              Criar lista (Client)
            </Button>

          </Grid>

          <Grid item xs={12}>

            <BigListComponent list={biglist}/>

          </Grid>

          <Grid item xs={12}>

          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App.defaultProps = {};

function mapStateToProps(state) {
  return {
    total: state.appStore.total,
    text: state.appStore.text,
    biglist: state.appStore.biglist,
  };
}

function mapActionToProps(dispatch) {
  return {
    add(total) {
      dispatch(appActions.add(total));
    },
    addText(text) {
      dispatch(appActions.addText(text));
    },
    reset() {
      dispatch(appActions.reset());
    },
    criarListaServer(total) {
      dispatch(appActions.criarListaServer(total));
    },
    criarListaClassic(total) {
      dispatch(appActions.criarListaClassic(total));
    },
    criarListaClient() {
      dispatch(appActions.criarListaClient());
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(
  withStyles(styles)(App),
);
