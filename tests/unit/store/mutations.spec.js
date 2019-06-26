import { createStore } from '../../../src/store'
import { SET_ORDERS, SET_PRODUCTS } from '../../../src/store/mutationTypes'

describe('Mutations', () => {
  const order = {
    id: 5572,
    status: 'on-hold',
    date_created_gmt: '2017-12-11T06:15:37',
    date_modified_gmt: '2017-12-11T06:15:37',
    total: '180',
    total_tax: '0'
  };
  const product = {
    id: 4877,
    name: 'Extra Bass Headphones',
    slug: 'extra-bass-headphones',
    permalink: 'http://localhost:8888/shop/extra-bass-headphones/',
    type: 'variable',
    status: 'publish'
  };
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('SET_ORDERS', () => {
    it('sets proper orders ', async () => {
      store.commit(SET_ORDERS, order);

      expect(store.state.orders).toEqual(order);
    });
  });

  describe('SET_PRODUCTS', () => {
    it('sets proper products ', async () => {
      store.commit(SET_PRODUCTS, product);

      expect(store.state.products).toEqual(product);
    });
  });
});
