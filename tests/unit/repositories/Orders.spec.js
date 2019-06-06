import ordersRepository from '../../../src/repositories/orders';
import axios from 'axios';

describe('Orders Repository', () => {
  it('getAll makes a call to ordersRepository endpoint', () => {
    const order = {
      id: 5572,
      status: 'on-hold',
      date_created_gmt: '2017-12-11T06:15:37',
      date_modified_gmt: '2017-12-11T06:15:37',
      total: '180',
      total_tax: '0'
    };
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => [order]);

    let ordersData = ordersRepository.getAll();
    expect(spy).toHaveBeenCalled();
    expect(ordersData).toEqual([order]);

    spy.mockRestore();
  });
});
