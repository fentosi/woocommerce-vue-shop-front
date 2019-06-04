import { shallowMount } from '@vue/test-utils';
import OrderList from '../../../src/views/OrderList';
import OrderListItem from '../../../src/views/OrderListItem';

describe('OrdersList.vue', () => {
  let component;
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
    component = shallowMount(OrderList, {
      propsData: {
        orders: data
      }
    });
  });

  it('renders orders list items', () => {
    expect(component.contains(OrderListItem)).toBe(true);
  });
});
