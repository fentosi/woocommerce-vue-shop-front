import { shallowMount } from '@vue/test-utils';
import OrdersListItem from '../../../src/views/OrderListItem';

describe('OrdersListItem.vue', () => {
  let component;
  const data = {
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
  };

  beforeEach(() => {
    component = shallowMount(OrdersListItem, {
      propsData: {
        ...data
      }
    });
  });

  it('renders orders list items', () => {
    expect(component.findAll('tr').length).toBe(1);
    expect(component.findAll('td').length).toBe(7);
  });

  describe('@name', () => {
    it('returns first name and last name in a concatenated string', () => {
      expect(component.vm.name).toBe('First Last');
    });
  });
});
