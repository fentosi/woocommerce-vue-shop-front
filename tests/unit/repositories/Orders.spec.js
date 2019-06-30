import ordersRepository from '../../../src/repositories/orders';
import axios from 'axios';

describe('Orders Repository', () => {
  const woocommerceUrl = 'http://localhost';
  const basePath = 'api/orders';
  const order = {
    id: 5572,
    status: 'on-hold',
    date_created_gmt: '2017-12-11T06:15:37',
    date_modified_gmt: '2017-12-11T06:15:37',
    total: '180',
    total_tax: '0'
  };
  let spy;

  afterEach(() => {
    spy.mockRestore();
  });

  it('"getAll" makes a call to orders endpoint', () => {
    const expectedUrl = woocommerceUrl + '/' + basePath;
    spy = jest.spyOn(axios, 'get').mockImplementation(() => [order]);

    let ordersData = ordersRepository.getAll();
    expect(spy).toHaveBeenCalledWith(expectedUrl);
    expect(ordersData).toEqual([order]);
  });

  it('"get" makes a call to orders endpoint with proper url', () => {
    const id = 123;
    const expectedUrl = woocommerceUrl + '/' + basePath + '/' + id;
    spy = jest.spyOn(axios, 'get').mockImplementation(() => order);

    let ordersData = ordersRepository.get(id);
    expect(spy).toHaveBeenCalledWith(expectedUrl);
    expect(ordersData).toEqual(order);
  });

  it('"create" makes a call to orders endpoint with proper url', () => {
    const expectedUrl = woocommerceUrl + '/' + basePath;
    const data = {
      something: 'data'
    };
    spy = jest.spyOn(axios, 'post');

    ordersRepository.create(data);

    expect(axios.post).toHaveBeenCalledWith(expectedUrl, data);
  });

  describe('getUrl', () => {
    it('getUrl if id is present returns proper url', () => {
      let expectedUrl = woocommerceUrl + '/' + basePath;
      expect(ordersRepository.getUrl()).toBe(expectedUrl);
    });

    it('getUrl if id is not present returns proper url', () => {
      const id = 123;
      const expectedUrl = woocommerceUrl + '/' + basePath + '/' + id;
      expect(ordersRepository.getUrl(id)).toBe(expectedUrl);
    });
  });
});
