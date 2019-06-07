import ordersRepository from '../../../src/repositories/orders';
import { LOAD_ORDERS } from '../../../src/store/actionTypes';
import { createStore } from '../../../src/store';

describe('Actions', () => {
  const order = {
    id: 5572,
    status: 'on-hold',
    date_created_gmt: '2017-12-11T06:15:37',
    date_modified_gmt: '2017-12-11T06:15:37',
    total: '180',
    total_tax: '0'
  };
  let orderRepositoryMock;
  let store;

  beforeEach(() => {
    orderRepositoryMock = jest.spyOn(ordersRepository, 'getAll').mockImplementation(() => [order]);
    store = createStore();
  });

  describe('LOAD_ORDERS', () => {
    it('sets proper orders ', async () => {
      const promise = store.dispatch(LOAD_ORDERS);

      await promise;

      expect(store.state.orders).toEqual([order]);
    });
  });
});
