import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from 'es2k-react-components/material/style/Typography';
import Button from 'es2k-react-components/material/components/Button';
import TextField from 'es2k-react-components/material/components/TextField';
import * as appActions from './appActions';
import BigListComponent from './BigListComponent';


class App extends PureComponent {

  render() {
    const { total, add, addText, text, reset, biglist, criarListaServer, criarListaClassic, criarListaClient } = this.props;


    return (
      <div>

        <Typography type="display2" gutterBottom> React App</Typography>
        <Button onClick={() => add(null)} raised color="primary">
          Add 1 (Client)
        </Button>
        <Button onClick={reset} raised color="primary">
          Zerar contador (Server)
        </Button>

        <br/><br/>

        <div>Total: {total}</div>

        <br/><br/>

        <TextField onChange={e => add(e.target.value)} value={total}/>

        <br/><br/>

        <TextField label="Text" onChange={e => addText(e.target.value)} value={text}/>

        <br/><br/>

        <Button onClick={() => criarListaClassic(total)} raised color="primary">
          Criar lista (Classic)
        </Button>

        <Button onClick={() => criarListaServer(total)} raised color="primary">
          Criar lista (Server)
        </Button>

        <Button onClick={() => criarListaClient()} raised color="primary">
          Criar lista (Client)
        </Button>

        <br/><br/>

        <BigListComponent list={biglist}/>

      </div>
    );
  }
}

App.propTypes = {};

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

export default connect(mapStateToProps, mapActionToProps)(App);
