import ordersRepository from '../../../src/repositories/orders';
import productsRepository from '../../../src/repositories/products';
import { GET_ORDER, LOAD_ORDER, LOAD_ORDERS, LOAD_PRODUCTS, LOAD_VARIATION } from '../../../src/store/actionTypes';
import { createStore } from '../../../src/store';
import { SET_PRODUCTS, STOP_VARIATION_LOADING } from '../../../src/store/mutationTypes';
jest.mock('../../../src/repositories/orders');
jest.mock('../../../src/repositories/products');

describe('Actions', () => {
  const order = {
    id: 5572,
    status: 'on-hold',
    date_created_gmt: '2017-12-11T06:15:37',
    date_modified_gmt: '2017-12-11T06:15:37',
    total: '180',
    total_tax: '0'
  };
  const orderNotInTheStore = {
    id: 123,
    status: 'completed',
    date_created_gmt: '2017-04-17T16:15:22',
    date_modified_gmt: '2017-04-17T16:15:22',
    total: '10',
    total_tax: '0'
  };
  const product = {
    id: 4877,
    name: 'Extra Bass Headphones',
    slug: 'extra-bass-headphones',
    permalink: 'http://localhost:8888/shop/extra-bass-headphones/',
    type: 'variable',
    status: 'publish',
    short_description: '<p>Description</p>',
    sku: '015',
    price: '199',
    manage_stock: false,
    stock_quantity: null,
    stock_status: 'instock',
    images: [
      {
        id: 4878,
        src: 'http://localhost:8888/wp-content/uploads/2016/07/extra-bass-headphones.jpg',
        name: 'extra-bass-headphones'
      }
    ],
    attributes: [
      {
        id: 1,
        name: 'Size',
        position: 0,
        visible: true,
        variation: true,
        options: [
          'S',
          'M',
          'L',
          'XL'
        ]
      }
    ],
    variations: [
      5798
    ],
    variationsData: []
  };

  const variation = {
    id: 5798,
    parent_id: 4877,
    name: 'Extra Bass Headphones - S',
    type: 'variation',
    status: 'publish',
    manage_stock: true,
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

  let orderRepositoryGetAllMock;
  let orderRepositoryGetMock;
  let productRepositoryGetAllMock;
  let productRepositoryGetMock;
  let store;

  beforeEach(() => {
    orderRepositoryGetAllMock = jest.spyOn(ordersRepository, 'getAll').mockImplementation(() => {
      return { data: [order] };
    });
    orderRepositoryGetMock = jest.spyOn(ordersRepository, 'get').mockImplementation(() => {
      return { data: orderNotInTheStore };
    });
    productRepositoryGetMock = jest.spyOn(productsRepository, 'get').mockImplementation(() => {
      return { data: variation };
    });
    productRepositoryGetAllMock = jest.spyOn(productsRepository, 'getAll').mockImplementation(() => {
      return { data: [product] };
    });
    store = createStore();
  });

  afterEach(() => {
    orderRepositoryGetAllMock.mockRestore();
    orderRepositoryGetMock.mockRestore();
    productRepositoryGetMock.mockRestore();
    productRepositoryGetAllMock.mockRestore();
  });

  describe('LOAD_ORDERS', () => {
    it('sets proper orders ', async () => {
      const promise = store.dispatch(LOAD_ORDERS);
      await promise;

      expect(store.state.orders).toEqual([order]);
    });
  });

  describe('LOAD_ORDER', () => {
    beforeEach(async () => {
      const promise = store.dispatch(LOAD_ORDERS);
      await promise;
    });

    it('loads order from repository', async () => {
      const orderID = 123;
      const currentOrder = await store.dispatch(LOAD_ORDER, orderID);

      expect(orderRepositoryGetMock).toHaveBeenCalledWith(orderID);
      expect(currentOrder).toEqual(orderNotInTheStore);
    });

    it('doesn\' change the state of the store', async () => {
      const orderID = 123;
      await store.dispatch(LOAD_ORDER, orderID);

      expect(store.state.orders).toEqual([order]);
    });
  });

  describe('GET_ORDER', () => {
    beforeEach(async () => {
      await store.dispatch(LOAD_ORDERS);
    });

    it('returns proper order if already in the store without calling the repository ', async () => {
      const currentOrder = await store.dispatch(GET_ORDER, 5572);

      expect(orderRepositoryGetMock).not.toHaveBeenCalled();
      expect(currentOrder).toEqual(order);
    });

    it('gets order from order repository if order is not in the store ', async () => {
      const currentOrder = await store.dispatch(GET_ORDER, 123);

      expect(orderRepositoryGetMock).toHaveBeenCalled();
      expect(currentOrder).toEqual(orderNotInTheStore);
    });
  });

  describe('LOAD_PRODUCTS', () => {
    const expectedProducts = {};

    beforeEach(() => {
      expectedProducts[product.id] = product;
    });

    it('sets proper products ', async () => {
      await store.dispatch(LOAD_PRODUCTS);

      expect(store.state.products).toEqual(expectedProducts);
    });

    it('clears products before loading', async () => {
      const promise = store.dispatch(LOAD_PRODUCTS);

      expect(store.state.products).toEqual({});

      await promise;

      expect(store.state.products).toEqual(expectedProducts);
    });

    xit('loads product variation', async () => {
      const storeDispatchMock = jest.spyOn(store, 'dispatch');

      await store.dispatch(LOAD_PRODUCTS);

      expect(store.dispatch).toHaveBeenNthCalledWith(2, LOAD_VARIATION, variation.id);

      storeDispatchMock.mockRestore();
    });
  });

  describe('LOAD_VARIATION', () => {
    const variationId = 5578;
    const productsWithId = {};
    productsWithId[product.id] = product;

    beforeEach(() => {
      store.commit(STOP_VARIATION_LOADING, variationId);
      store.commit(SET_PRODUCTS, productsWithId);
    });

    it('sets loading for given variation ', async () => {
      expect(store.state.variationLoading[variationId]).toBe(false);

      store.dispatch(LOAD_VARIATION, variationId);

      expect(store.state.variationLoading[variationId]).toBe(true);
    });

    it('unsets loading for variation after finished', async () => {
      const promise = store.dispatch(LOAD_VARIATION, variationId);

      expect(store.state.variationLoading[variationId]).toBe(true);

      await promise;

      expect(store.state.variationLoading[variationId]).toBe(false);
    });

    it('sets variation data on product', async () => {
      await store.dispatch(LOAD_VARIATION, variationId);

      expect(store.state.products[product.id].variationsData[0]).toBe(variation);
    });
  });
});
