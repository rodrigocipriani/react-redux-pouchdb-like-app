import 'babel-polyfill';
import Vue from 'vue';
import 'normalize.css';
import reduxStorePlugin from 'es2k-helpers/vue-redux-connect/reduxStorePlugin';
import store from './store';
import './main.css';
import App from './RealTime/RealTime.vue';


Vue.use(reduxStorePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app-vue',
  // router,
  store,
  render: h => (
      <App/>
  ),
});

store.subscribe(() => {
  // console.log('store.getState()', store.getState());
  // const total = store.getState().appReducer.total;
});
