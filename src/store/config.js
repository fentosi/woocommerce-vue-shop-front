import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
    orders: [],
    products: [],
    cart: [],
    error: null
  },
  actions,
  mutations,
  getters
};
