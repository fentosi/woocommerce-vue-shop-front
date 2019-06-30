import { GET_ORDER, LOAD_ORDER, LOAD_ORDERS, LOAD_PRODUCTS } from './actionTypes';
import ordersRepository from '../repositories/orders';
import { SET_ORDERS, SET_PRODUCTS } from './mutationTypes';
import productRepository from '../repositories/products';

export default {
  async [LOAD_ORDERS](store) {
    const orders = await ordersRepository.getAll();
    store.commit(SET_ORDERS, orders.data);
  },

  async [LOAD_ORDER](store, orderID) {
    return (await ordersRepository.get(orderID)).data;
  },

  async [GET_ORDER](store, orderID) {
    let order = store.getters.order(orderID) || store.dispatch(LOAD_ORDER, orderID);
    return order;
  },

  async [LOAD_PRODUCTS](store) {
    store.commit(SET_PRODUCTS, []);
    const products = await productRepository.getAll();
    store.commit(SET_PRODUCTS, products.data);
  }
};
