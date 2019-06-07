import { SET_ORDERS } from './mutationTypes';

export default {
  [SET_ORDERS](state, orders) {
    state.orders = orders;
  }
};
