import ordersRepository from '../../../src/repositories/orders';
import productsRepository from '../../../src/repositories/products';
import { GET_ORDER, LOAD_ORDER, LOAD_ORDERS, LOAD_PRODUCTS } from '../../../src/store/actionTypes';
import { createStore } from '../../../src/store';
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
      5798,
      5799,
      5800,
      5801
    ]
  };

  let orderRepositoryGetAllMock;
  let orderRepositoryGetMock;
  let productRepositoryGetAllMock;
  let store;

  beforeEach(() => {
    orderRepositoryGetAllMock = jest.spyOn(ordersRepository, 'getAll').mockImplementation(() => {
      return { data: [order] };
    });
    orderRepositoryGetMock = jest.spyOn(ordersRepository, 'get').mockImplementation(() => {
      return { data: orderNotInTheStore };
    });

    productRepositoryGetAllMock = jest.spyOn(productsRepository, 'getAll').mockImplementation(() => {
      return { data: [product] };
    });
    store = createStore();
  });

  afterEach(() => {
    orderRepositoryGetAllMock.mockRestore();
    orderRepositoryGetMock.mockRestore();
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
    it('sets proper products ', async () => {
      await store.dispatch(LOAD_PRODUCTS);
      expect(store.state.products).toEqual([product]);
    });

    it('clears products before loading', async () => {
      const promise = store.dispatch(LOAD_PRODUCTS);

      expect(store.state.products).toEqual([]);

      await promise;

      expect(store.state.products).toEqual([product]);
    });
  });
});
