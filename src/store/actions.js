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

    products.forEach((product) => {
      product.variationsData = [];
      if (Array.isArray(product.variations)) {
        product.variations.forEach((variationId) => {
          store.dispatch(LOAD_VARIATION, variationId);
        });
      }

      productsWithId[product.id] = product;
    });

    store.commit(SET_PRODUCTS, productsWithId);
  },

  async [LOAD_VARIATION](store, variationId) {
    store.commit(START_VARIATION_LOADING, variationId);
    let variation = [];

    try {
      variation = (await productRepository.get(variationId)).data;
      store.commit(SET_VARIATION, { parentId: variation.parent_id, variation });
      // eslint-disable-next-line no-empty
    } catch (e) {
    } finally {
      store.commit(STOP_VARIATION_LOADING, variationId);
    }
  }
};
