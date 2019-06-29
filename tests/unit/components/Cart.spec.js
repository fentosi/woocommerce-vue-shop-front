import { shallowMount } from '@vue/test-utils';
import Cart from '../../../src/components/Cart';
import { createStore } from '../../../src/store';
import { CLEAR_CART } from '../../../src/store/mutationTypes';

describe('Cart.vue', () => {
  let store;
  let component;

  beforeEach(() => {
    store = createStore();
    store.state.products = [
      { id: 1, name: 'product 1', price: '19.99' },
      { id: 2, name: 'product 2', price: '9.99' },
      { id: 3, name: 'product 3', price: '10' }
    ];

    component = shallowMount(Cart, {
      mocks: {
        $store: store
      }
    });
  });

  describe('cartItems', () => {
    it('returns [] if there is no item in the cart', () => {
      expect(component.vm.cartItems).toEqual([]);
    });

    it('returns items in the cart', () => {
      component.vm.$store.state.cart = [
        { productId: 1, variationId: null, quantity: 1 },
        { productId: 3, variationId: null, quantity: 2 }
      ];

      const expectedItems = [
        { name: 'product 1', price: 19.99, quantity: 1 },
        { name: 'product 3', price: 20.00, quantity: 2 }
      ];

      expect(component.vm.cartItems).toEqual(expectedItems);
    });
  });

  describe('totalPrice', () => {
    beforeEach(() => {
      store.commit(CLEAR_CART);
    });

    it('returns 0 if there is no item in the cart', () => {
      expect(component.vm.totalPrice).toEqual(0);
    });

    it('returns total price', () => {
      component.vm.$store.state.cart = [
        { productId: 1, variationId: null, quantity: 1 },
        { productId: 3, variationId: null, quantity: 2 }
      ];

      expect(component.vm.totalPrice).toEqual(39.99);
    });
  });
});
