import { SET_ORDERS, SET_PRODUCTS } from './mutationTypes'

export default {
  [SET_ORDERS](state, orders) {
    state.orders = orders;
  },
  [SET_PRODUCTS](state, products) {
    state.products = products;
  }
};
