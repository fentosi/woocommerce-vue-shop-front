import { shallowMount } from '@vue/test-utils';
import OrderList from '../../../src/views/OrderList';
import OrderListItem from '../../../src/views/OrderListItem';
import { createStore } from '../../../src/store';

describe('OrdersList.vue', () => {
  let component;
  let store;

  const data = [{
    id: 123,
    billing: {
      first_name: 'First',
      last_name: 'Last'
    },
    payment_method_title: 'payment method',
    total: '123',
    status: 'status',
    date_created_gmt: 'date created',
    date_paid_gmt: 'date paid'
  }];

  beforeEach(() => {
    store = store = createStore();
    store.state.orders = data;
    component = shallowMount(OrderList, {
      mocks: {
        $store: store
      }
    });
  });

  it('renders ordersRepository list items', () => {
    expect(component.contains(OrderListItem)).toBe(true);
  });
});
