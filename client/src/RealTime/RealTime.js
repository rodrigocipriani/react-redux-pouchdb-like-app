import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'es2k-react-components/material/style/Typography';
import Button from 'es2k-react-components/material/components/Button';
import TextField from 'es2k-react-components/material/components/TextField';
import * as realTimeActions from './realTimeActions';
import RealTimeBigListComponent from './RealTimeBigListComponent';
import hacker from './hacker.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 5,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class RealTime extends PureComponent {

  render() {
    const {
            total, add, addText, text, reset, biglist, criarListaServer,
            criarListaClassic, criarListaClient, classes,
          } = this.props;


    return (
      <div className={classes.root}>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography type="display2" gutterBottom> React RealTime </Typography>
            <img style={{ width: 200 }} src={hacker}/>

            <br/><br/>
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

            <RealTimeBigListComponent list={biglist}/>

          </Grid>

          <Grid item xs={12}>

          </Grid>
        </Grid>
      </div>
    );
  }
}

RealTime.propTypes = {
  classes: PropTypes.object.isRequired,
};

RealTime.defaultProps = {};

function mapStateToProps(state) {
  return {
    total: state.realTimeStore.total,
    text: state.realTimeStore.text,
    biglist: state.realTimeStore.biglist,
  };
}

function mapActionToProps(dispatch) {
  return {
    add(total) {
      dispatch(realTimeActions.add(total));
    },
    addText(text) {
      dispatch(realTimeActions.addText(text));
    },
    reset() {
      dispatch(realTimeActions.reset());
    },
    criarListaServer(total) {
      dispatch(realTimeActions.criarListaServer(total));
    },
    criarListaClassic(total) {
      dispatch(realTimeActions.criarListaClassic(total));
    },
    criarListaClient() {
      dispatch(realTimeActions.criarListaClient());
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(
  withStyles(styles)(RealTime),
);
