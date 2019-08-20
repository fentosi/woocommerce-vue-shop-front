import { GET_ORDER, LOAD_ORDER, LOAD_ORDERS, LOAD_PRODUCTS, LOAD_VARIATIONS } from './actionTypes';
import ordersRepository from '../repositories/orders';
import {
  SET_ORDERS,
  SET_PRODUCTS,
  SET_VARIATION,
  START_VARIATIONS_LOADING,
  STOP_VARIATIONS_LOADING
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
      productsWithId[product.id] = product;
    });

    await store.commit(SET_PRODUCTS, productsWithId);

    products.forEach((product) => {
      store.dispatch(LOAD_VARIATIONS, product);
    });
  },

  async [LOAD_VARIATIONS](store, product) {
    store.commit(START_VARIATIONS_LOADING, product.id);

    const variations = (await productRepository.getVariations(product.id)).data;

    variations.forEach(async (variation) => {
      await store.commit(SET_VARIATION, { productID: product.id, variation });
    });

    store.commit(STOP_VARIATIONS_LOADING, product.id);
  }
};
