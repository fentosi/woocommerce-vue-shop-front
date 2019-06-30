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

  it('returns data with items from the cart', () => {
    const cart = [
      {
        'productId': 1112,
        'variationId': null,
        'quantity': 2
      },
      {
        'productId': 4872,
        'variationId': null,
        'quantity': 1
      }];

    const expectedData = {
      set_paid: true,
      line_items: cart
    };

    expect(createOrderData(cart)).toEqual(expectedData);
  });
});
