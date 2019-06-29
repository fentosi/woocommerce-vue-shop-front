import { createStore } from '../../../src/store';

describe('Getters', () => {
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
    store.state.orders = [order];
    store.state.products = [product];
  });

  describe('order', () => {
    it('returns order if it is in the store ', async () => {
      let expectedOrder = store.getters.order(5572);

      expect(expectedOrder).toEqual(order);
    });

    it('returns null if it is not in the store ', async () => {
      let expectedOrder = store.getters.order(1354);

      expect(expectedOrder).toBe(null);
    });
  });

  describe('product', () => {
    it('returns product from store, if exists', () => {
      const productInStore = store.getters.product(4877);

      expect(productInStore).toEqual(product);
    });

    it('returns undefined product does not exist in store', () => {
      const productInStore = store.getters.product(47);

      expect(productInStore).toEqual(undefined);
    });
  });
});
