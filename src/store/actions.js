import { GET_ORDER, LOAD_ORDER, LOAD_ORDERS } from './actionTypes';
import ordersRepository from '../repositories/orders';
import { SET_ORDERS } from './mutationTypes';

export default {
  async [LOAD_ORDERS](store) {
    const orders = await ordersRepository.getAll();
    store.commit(SET_ORDERS, orders);
  },

  async [LOAD_ORDER](store, orderID) {
    return ordersRepository.get(orderID);
  },

  async [GET_ORDER](store, orderID) {
    let orders = store.state.orders.filter((order) => {
      return order.id === orderID;
    });

    if (orders.length) {
      return orders.pop();
    } else {
      return store.dispatch(LOAD_ORDER, orderID);
    }
  }
};
