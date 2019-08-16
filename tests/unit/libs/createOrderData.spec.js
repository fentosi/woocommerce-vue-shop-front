import { createOrderData } from '../../../src/libs/createOrderData';

describe('createOrderData', () => {
  it('throws error if no cart parameter', () => {
    expect(() => {
      createOrderData(null);
    }).toThrow(Error);
  });

  it('throws error if no item in cart parameter', () => {
    expect(() => {
      createOrderData([]);
    }).toThrow(Error);
  });

  it('throws error if cart parameter is not an array', () => {
    expect(() => {
      createOrderData({});
    }).toThrow(Error);
  });

  it('returns data with items from the cart without the variationId if null', () => {
    const cart = [
      {
        'productId': 1112,
        'variationId': 123,
        'quantity': 2
      },
      {
        'productId': 4872,
        'variationId': null,
        'quantity': 1
      }];

    const expectedData = {
      set_paid: true,
      payment_method: 'cod',
      payment_method_title: 'Cash on delivery',
      line_items: [{
        'productId': 1112,
        'variationId': 123,
        'quantity': 2
      },
      {
        'productId': 4872,
        'quantity': 1
      }]
    };

    expect(createOrderData(cart)).toEqual(expectedData);
  });
});
