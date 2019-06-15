import { shallowMount } from '@vue/test-utils';
import Order from '../../../src/views/Order';
import { createStore } from '../../../src/store';
import { GET_ORDER } from '../../../src/store/actionTypes';

describe('Order.vue', () => {
  let component;
  let store;
  let spy;
  const order = {
    id: 123,
    billing: {
      first_name: 'First',
      last_name: 'Last'
    },
    line_items: [
      {
        id: 1,
        name: 'Lime Green Headphones',
        product_id: 1077,
        quantity: 1,
        total: '150',
        sku: '006',
        price: 150
      },
      {
        id: 2,
        name: 'Wireless Tv Headphones',
        product_id: 4872,
        quantity: 1,
        total: '230',
        sku: '014',
        price: 230
      }
    ],
    payment_method_title: 'payment method',
    total: '123',
    status: 'status',
    date_created_gmt: 'date created',
    date_paid_gmt: 'date paid'
  };

  beforeEach(() => {
    store = createStore();
    store.state.orders = [order];

    spy = jest.spyOn(store, 'dispatch').mockImplementation(() => order);

    component = shallowMount(Order, {
      mocks: {
        $store: store,
        $route: {
          params: {
            id: order.id
          }
        }
      }
    });
  });

  it('loads order from store or repository', () => {
    expect(spy).toHaveBeenCalledWith(GET_ORDER, order.id);
  });

  it('renders line items', () => {
    expect(component.findAll('.line-item').length).toBe(order.line_items.length);
  });
});
