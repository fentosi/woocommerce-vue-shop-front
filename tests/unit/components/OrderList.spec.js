import { shallowMount } from '@vue/test-utils';
import OrderList from '../../../src/views/OrderList';
import OrderListItem from '../../../src/views/OrderListItem';
import { createStore } from '../../../src/store';
import { SET_ERROR } from '../../../src/store/mutationTypes';
import Loader from '../../../src/components/Loader';

describe('OrdersList.vue', () => {
  let component;
  let store;
  let storeCommitSpy;

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
    store = createStore();
    storeCommitSpy = jest.spyOn(store, 'commit');
    store.state.orders = data;
    component = shallowMount(OrderList, {
      mocks: {
        $store: store
      }
    });
  });

  it('renders ordersRepository list items', async () => {
    await component.vm.loadOrders();
    expect(component.contains(OrderListItem)).toBe(true);
  });

  it('sets loading on loadOrders', async () => {
    const promise = component.vm.loadOrders();

    expect(component.vm.isLoading).toEqual(true);
    expect(component.contains(Loader)).toBe(true);

    await promise;

    expect(component.vm.isLoading).toEqual(false);
    expect(component.contains(Loader)).toBe(false);
  });

  it('sets error if loading is failed', async () => {
    await component.vm.loadOrders();

    expect(storeCommitSpy).toHaveBeenCalledWith(SET_ERROR, 'Something went wrong');
  });
});
