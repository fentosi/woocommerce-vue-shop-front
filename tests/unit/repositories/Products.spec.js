import axios from 'axios';
import productRepository from '../../../src/repositories/products'

describe('Products Repository', () => {
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

  it('"getAll" makes a call to productRepository endpoint', () => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => [product]);

    let ordersData = productRepository.getAll();
    expect(spy).toHaveBeenCalled();
    expect(ordersData).toEqual([product]);

    spy.mockRestore();
  });

  it('"get" makes a call to productRepository endpoint with proper url', () => {
    const id = 123;
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => product);

    let ordersData = productRepository.get(id);
    expect(spy).toHaveBeenCalled();
    expect(ordersData).toEqual(product);

    spy.mockRestore();
  });

  describe('getUrl', () => {
    const woocommerceUrl = 'http://localhost';
    const basePath = 'api/products';

    it('getUrl if id is present returns proper url', () => {
      let expectedUrl = woocommerceUrl + '/' + basePath;
      expect(productRepository.getUrl()).toBe(expectedUrl);
    });

    it('getUrl if id is not present returns proper url', () => {
      const id = 123;
      const expectedUrl = woocommerceUrl + '/' + basePath + '/' + id;
      expect(productRepository.getUrl(id)).toBe(expectedUrl);
    });
  });
});
