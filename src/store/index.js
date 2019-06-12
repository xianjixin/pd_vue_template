import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
import getters from './getter';
import actions from './actions';
import mutations from './mutations';
import state from './state';

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});

export default store;
