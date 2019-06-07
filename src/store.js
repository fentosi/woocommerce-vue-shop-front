import Vue from 'vue';
import Vuex from 'vuex';
import storeConfig from './store/config';

Vue.use(Vuex);

export const createStore = function createStore() {
  return new Vuex.Store(storeConfig);
};
