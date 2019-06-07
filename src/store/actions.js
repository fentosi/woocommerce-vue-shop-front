import { LOAD_ORDERS } from './actionTypes';
import ordersRepository from '../repositories/orders';
import { SET_ORDERS } from './mutationTypes';

export default {
  async [LOAD_ORDERS](store) {
    const orders = await ordersRepository.getAll();
    store.commit(SET_ORDERS, orders);
  }
};
