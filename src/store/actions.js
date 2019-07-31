import { GET_ORDER, LOAD_ORDER, LOAD_ORDERS, LOAD_PRODUCTS, LOAD_VARIATION } from './actionTypes';
import ordersRepository from '../repositories/orders';
import {
  SET_ORDERS,
  SET_PRODUCTS,
  SET_VARIATION,
  START_VARIATION_LOADING,
  STOP_VARIATION_LOADING
} from './mutationTypes';
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
    const productsWithId = {};
    store.commit(SET_PRODUCTS, productsWithId);

    const products = (await productRepository.getAll()).data;

    for (const index in products) {
      const productId = products[index].id;
      productsWithId[productId] = products[index];
    }

    store.commit(SET_PRODUCTS, productsWithId);
  },

  async [LOAD_VARIATION](store, variationId) {
    store.commit(START_VARIATION_LOADING, variationId);

    const variation = (await productRepository.get(variationId)).data;

    store.commit(SET_VARIATION, { parentId: variation.parent_id, variation });

    store.commit(STOP_VARIATION_LOADING, variationId);
  }
};
