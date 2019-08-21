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

  const variation = {
    id: 22,
    attributes:
      [
        { id: 1, name: 'Size', option: 'S' }
      ],
    stock_quantity: 3
  };

  const product = {
    id: 4877,
    name: 'Extra Bass Headphones',
    slug: 'extra-bass-headphones',
    permalink: 'http://localhost:8888/shop/extra-bass-headphones/',
    type: 'variable',
    status: 'publish',
    variationsData: [variation]
  };

  const product2 = {
    id: 6654,
    name: 'Suda lamp',
    slug: 'suda-lamp',
    permalink: 'http://localhost:8888/shop/suda-lamp/',
    type: 'simple',
    status: 'publish',
    variationsData: []
  };

  let store;

  beforeEach(() => {
    store = createStore();
    store.state.orders = [order];
    store.state.products = {
      [product.id]: product,
      [product2.id]: product2
    };
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

  describe('variation', () => {
    it('returns variation from store, if exists', () => {
      const variationInStore = store.getters.variation(4877, 22);

      expect(variationInStore).toEqual(variation);
    });

    it('returns undefined product does not exist in store', () => {
      const variationInStore = store.getters.variation(47);

      expect(variationInStore).toEqual(undefined);
    });

    it('returns undefined product  exists but variation does not exist in store', () => {
      const variationInStore = store.getters.variation(4877, 11);

      expect(variationInStore).toEqual(undefined);
    });
  });

  describe('productsBySearchTerm', () => {
    it('no searchTerm, returns all products from store ', function() {
      const productsBySearchTerm = store.getters.productsBySearchTerm();

      expect(productsBySearchTerm).toEqual(store.state.products);
    });

    it('empty searchTerm, returns all products from store ', function() {
      const productsBySearchTerm = store.getters.productsBySearchTerm('');

      expect(productsBySearchTerm).toEqual(store.state.products);
    });

    it('given searchTerm, returns matching products from store ', function() {
      const productsBySearchTerm = store.getters.productsBySearchTerm('head');

      expect(productsBySearchTerm).toEqual({ [product.id]: product });
    });
  });
});
