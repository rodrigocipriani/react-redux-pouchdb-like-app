// import { UiAlert, UiButton } from 'keen-ui';
import UiButton from 'keen-ui/lib/UiButton';
import connect from 'es2k-helpers/vue-redux-connect/connect';
import { realTimeActionTypes } from './realTimeActionTypes';

const RealTime = {
  data: () => ({
    isRed: true,
  }),
  components: {
    UiButton,
  },
  // methods: {
  //   add(event) {
  //     store.dispatch({ type: 'ADD' });
  //   },
  // },
  props: {
    total: {
      type: Number,
    },
    add: {
      type: Function,
    },
  },
  render(h) {
    return (
        <div class={{ 'is-red': this.isRed }}>
          <h2>Vue RealTime</h2>
          <ui-button onClick={this.add} type="primary">Add from Vue</ui-button>
          <div>Total: {this.total}</div>
        </div>
    );
  },
};

function mapStateToProps(state) {
  return {
    total: state.realTimeStore.total,
  };
}

function mapActionToProps(dispatch) {
  return {
    add() {
      dispatch({
        type: realTimeActionTypes.ADD,
        // data: { 1 },
      });
    },
  };
}

export default connect(mapStateToProps, mapActionToProps)(RealTime);
