import { createStore } from '../../../src/store';
import {
  SET_ORDERS,
  SET_PRODUCTS,
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  REMOVE_ITEM_FROM_CART,
  DELETE_ITEM_FROM_CART,
  SET_ERROR,
  UNSET_ERROR,
  START_VARIATIONS_LOADING,
  STOP_VARIATIONS_LOADING,
  SET_VARIATION
} from '../../../src/store/mutationTypes';

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
    status: 'publish',
    variationsData: []
  };
  const variation = {
    id: 5798,
    name: 'Extra Bass Headphones - S',
    type: 'variation',
    status: 'publish',
    manage_stock: true,
    parent_id: 4877,
    stock_quantity: 5,
    stock_status: 'instock',
    attributes: [
      {
        id: 1,
        name: 'Size',
        option: 'S'
      }
    ]
  };
  const productList = {};

  let store;

  beforeEach(() => {
    store = createStore();
    productList[product.id] = product;
  });

  describe('SET_ORDERS', () => {
    it('sets proper orders ', async () => {
      store.commit(SET_ORDERS, order);

      expect(store.state.orders).toEqual(order);
    });
  });

  describe('SET_PRODUCTS', () => {
    it('sets proper products ', async () => {
      store.commit(SET_PRODUCTS, productList);

      expect(store.state.products).toEqual(productList);
    });
  });

  describe('SET_VARIATION', () => {
    it('sets variation on it\'s parent product', async () => {
      store.commit(SET_PRODUCTS, productList);
      store.commit(SET_VARIATION, { productID: product.id, variation });

      expect(store.state.products[product.id].variationsData[0]).toEqual(variation);
    });
  });

  describe('SET_ERROR', () => {
    it('sets error ', async () => {
      const error = 'error';
      store.commit(SET_ERROR, error);

      expect(store.state.error).toEqual(error);
    });
  });

  describe('UNSET_ERROR', () => {
    it('sets error ', async () => {
      const error = 'error';
      store.commit(SET_ERROR, error);

      expect(store.state.error).toEqual(error);

      store.commit(UNSET_ERROR);

      expect(store.state.error).toEqual(null);
    });
  });

  describe('CLEAR_CART', () => {
    it('clears the cart', async () => {
      store.commit(ADD_ITEM_TO_CART, {
        productId: 2,
        quantity: 2
      });

      store.commit(CLEAR_CART);

      expect(store.state.cart.length).toEqual(0);
    });
  });

  describe('ADD_ITEM_TO_CART', () => {
    beforeEach(() => {
      store.commit(CLEAR_CART);
    });

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

    it('adds new product to cart when cart is not empty ', async () => {
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

  describe('REMOVES_ITEM_FROM_CART', () => {
    beforeEach(() => {
      store.commit(CLEAR_CART);

      store.commit(ADD_ITEM_TO_CART, {
        productId: 2,
        quantity: 2
      });

      store.commit(ADD_ITEM_TO_CART, {
        productId: 3,
        variationId: 4,
        quantity: 1
      });
    });

    it('removes existing product from cart if quantity is 1', async () => {
      const expectedCart = [
        {
          productId: 2,
          variationId: undefined,
          quantity: 2
        }
      ];

      store.commit(REMOVE_ITEM_FROM_CART, {
        productId: 3,
        variationId: 4
      });

      expect(store.state.cart).toEqual(expectedCart);
    });

    it('decreases quantity if quantity is greater than 1', async () => {
      const expectedCart = [
        {
          productId: 2,
          variationId: undefined,
          quantity: 1
        },
        {
          productId: 3,
          variationId: 4,
          quantity: 1
        }
      ];

      store.commit(REMOVE_ITEM_FROM_CART, {
        productId: 2,
        variationId: undefined
      });

      expect(store.state.cart).toEqual(expectedCart);
    });

    it('does not change cart if the given product is not in the cart', async () => {
      const expectedCart = [
        {
          productId: 2,
          variationId: undefined,
          quantity: 2
        },
        {
          productId: 3,
          variationId: 4,
          quantity: 1
        }
      ];

      store.commit(REMOVE_ITEM_FROM_CART, {
        productId: 5,
        variationId: 6
      });

      expect(store.state.cart).toEqual(expectedCart);
    });
  });

  describe('DELETE_ITEM_FROM_CART', () => {
    beforeEach(() => {
      store.commit(CLEAR_CART);

      store.commit(ADD_ITEM_TO_CART, {
        productId: 2,
        quantity: 2
      });

      store.commit(ADD_ITEM_TO_CART, {
        productId: 3,
        variationId: 4,
        quantity: 1
      });
    });

    it('deletes product from cart', async () => {
      const expectedCart = [
        {
          productId: 2,
          variationId: undefined,
          quantity: 2
        }
      ];

      store.commit(DELETE_ITEM_FROM_CART, {
        productId: 3,
        variationId: 4
      });

      expect(store.state.cart).toEqual(expectedCart);
    });
  });

  describe('START_VARIATIONS_LOADING', () => {
    it('sets loading for a given variation ', async () => {
      const productId = 5578;

      store.commit(START_VARIATIONS_LOADING, productId);

      expect(store.state.variationLoading[productId]).toBe(true);
    });
  });

  describe('STOP_VARIATIONS_LOADING', () => {
    const productId = 5578;

    beforeEach(() => {
      store.state.variationLoading[productId] = true;
    });
    it('unsets loading for a given variation ', async () => {
      expect(store.state.variationLoading[productId]).toBe(true);

      store.commit(STOP_VARIATIONS_LOADING, productId);

      expect(store.state.variationLoading[productId]).toBe(false);
    });
  });
});
