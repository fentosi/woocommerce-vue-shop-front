import { createStore } from '../../../src/store';
import { SET_ORDERS, SET_PRODUCTS, ADD_ITEM_TO_CART } from '../../../src/store/mutationTypes';

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

  describe('ADD_ITEM_TO_CART', () => {
    it('adds new product to cart when cart is empty ', async () => {
      const expectedProduct = {
        productId: 3,
        variationId: 4,
        quantity: 2
      };

      store.commit(ADD_ITEM_TO_CART, {
        productId: expectedProduct.productId,
        variationId: expectedProduct.variationId,
        quantity: expectedProduct.quantity
      });

      const lastProductInCart = store.state.cart[store.state.cart.length - 1];
      expect(lastProductInCart).toEqual(expectedProduct);
    });
  });

  it('adds new product to cart when cart is not empty ', async () => {
    store.state.cart = [];

    const expectedProduct = {
      productId: 3,
      variationId: 4,
      quantity: 2
    };

    store.commit(ADD_ITEM_TO_CART, {
      productId: 2,
      quantity: 2
    });

    store.commit(ADD_ITEM_TO_CART, {
      productId: expectedProduct.productId,
      variationId: expectedProduct.variationId,
      quantity: expectedProduct.quantity
    });

    const lastProductInCart = store.state.cart[store.state.cart.length - 1];
    expect(lastProductInCart).toEqual(expectedProduct);
  });

  it('adds existing product to cart, updates its quantity', async () => {
    store.state.cart = [];

    const expectedCart = [
      {
        productId: 3,
        variationId: 4,
        quantity: 2
      },
      {
        productId: 2,
        variationId: undefined,
        quantity: 2
      }
    ];

    store.commit(ADD_ITEM_TO_CART, {
      productId: 3,
      variationId: 4,
      quantity: 1
    });

    store.commit(ADD_ITEM_TO_CART, {
      productId: 2,
      quantity: 2
    });

    store.commit(ADD_ITEM_TO_CART, {
      productId: 3,
      variationId: 4,
      quantity: 1
    });

    expect(store.state.cart).toEqual(expectedCart);
  });
});
