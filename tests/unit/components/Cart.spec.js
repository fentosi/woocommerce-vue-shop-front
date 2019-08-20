import { shallowMount } from '@vue/test-utils';
import Cart from '../../../src/components/Cart';
import { createStore } from '../../../src/store';
import {
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  DELETE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART, SET_ERROR
} from '../../../src/store/mutationTypes';
import ordersRepository from '../../../src/repositories/orders';
import { LOAD_PRODUCTS } from '../../../src/store/actionTypes';
jest.mock('../../../src/repositories/orders');

describe('Cart.vue', () => {
  let store;
  let component;
  let storeCommitSpy;

  beforeEach(() => {
    store = createStore();
    storeCommitSpy = jest.spyOn(store, 'commit');
    store.state.products = {
      1: { id: 1, name: 'product 1', price: '19.99', variationsData: [] },
      2: { id: 2, name: 'product 2', price: '9.99', variationsData: [] },
      3: { id: 3, name: 'product 3', price: '10', variationsData: [] },
      4: { id: 4,
        name: 'product 4',
        price: '10',
        variationsData: [{
          variationId: 5
        }] }
    };

    component = shallowMount(Cart, {
      mocks: {
        $store: store
      }
    });
  });

  afterEach(() => {
    storeCommitSpy.mockRestore();
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
        { id: '1', productId: 1, name: 'product 1', price: 19.99, quantity: 1, variationId: null, variationData: null },
        { id: '3', productId: 3, name: 'product 3', price: 20.00, quantity: 2, variationId: null, variationData: null }
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

  describe('methods', () => {
    beforeEach(() => {
      store = createStore();
      storeCommitSpy = jest.spyOn(store, 'commit');
      component = shallowMount(Cart, {
        mocks: {
          $store: store
        }
      });
    });

    describe('addItemToCart', () => {
      it('calls store', () => {
        let expectedParam = {
          productId: 2,
          variationId: 3,
          quantity: 1
        };

        component.vm.addItemToCart({
          productId: expectedParam.productId,
          variationId: expectedParam.variationId
        });

        expect(store.commit).toHaveBeenCalledWith(ADD_ITEM_TO_CART, expectedParam);
      });
    });

    describe('removeItemFromCart', () => {
      it('calls store', () => {
        let expectedParam = {
          productId: 2,
          variationId: 3
        };

        component.vm.removeItemFromCart({
          productId: expectedParam.productId,
          variationId: expectedParam.variationId
        });

        expect(store.commit).toHaveBeenCalledWith(REMOVE_ITEM_FROM_CART, expectedParam);
      });
    });

    it('enables/disables submit button according to isSubmitting data', () => {
      component.vm.$store.state.cart = [
        { productId: 1, variationId: null, quantity: 1 },
        { productId: 3, variationId: null, quantity: 2 }
      ];

      expect(component.find('button.submit').attributes('disabled')).toBe(undefined);

      component.vm.isSubmitting = true;
      expect(component.find('button.submit').attributes('disabled')).toBe('disabled');

      component.vm.isSubmitting = false;
      expect(component.find('button.submit').attributes('disabled')).toBe(undefined);
    });

    describe('deleteItemFromCart', () => {
      it('calls store', () => {
        let expectedParam = {
          productId: 2,
          variationId: 3
        };

        component.vm.deleteItemFromCart({
          id: expectedParam.productId,
          variationId: expectedParam.variationId
        });

        expect(store.commit).toHaveBeenCalledWith(DELETE_ITEM_FROM_CART, expectedParam);
      });
    });

    describe('clearCart', () => {
      it('calls store', () => {
        component.vm.clearCart();

        expect(store.commit).toHaveBeenCalledWith(CLEAR_CART);
      });
    });

    describe('submitCart', () => {
      let spy;
      const cart = [
        {
          'productId': 1,
          'variationId': null,
          'quantity': 2
        },
        {
          'productId': 2,
          'variationId': null,
          'quantity': 1
        },
        {
          'productId': 4,
          'variationId': 5,
          'quantity': 1
        }];

      beforeEach(() => {
        component.vm.clearCart();
        store.state.cart = cart;
      });

      afterEach(() => {
        if (spy) {
          spy.mockRestore();
        }
      });

      it('calls repository to create an order', () => {
        const expectedData = {
          set_paid: true,
          line_items: [
            {
              product_id: cart[0].productId,
              quantity: cart[0].quantity
            },
            {
              product_id: cart[1].productId,
              quantity: cart[1].quantity
            },
            {
              product_id: cart[2].productId,
              variation_id: cart[2].variationId,
              quantity: cart[2].quantity
            }
          ],
          payment_method: 'cod',
          payment_method_title: 'Cash on delivery'
        };

        spy = jest.spyOn(ordersRepository, 'create');

        component.vm.submitCart();

        expect(spy).toHaveBeenCalledWith(expectedData);
      });

      it('sets isSubmitting', async () => {
        spy = jest.spyOn(ordersRepository, 'create');

        const promise = component.vm.submitCart();
        expect(component.vm.isSubmitting).toEqual(true);
        await promise;
        expect(component.vm.isSubmitting).toEqual(false);
      });

      it('calls load products and clear cart on successful submit', async () => {
        let storeDispatchSpy = jest.spyOn(store, 'dispatch');

        await component.vm.submitCart();

        expect(storeCommitSpy).toHaveBeenCalledWith(CLEAR_CART);
        expect(storeDispatchSpy).toHaveBeenCalledWith(LOAD_PRODUCTS);

        storeDispatchSpy.mockRestore();
      });

      it('sets error if submitting is failed', async () => {
        spy = jest.spyOn(ordersRepository, 'create').mockImplementation(() => {
          throw new Error();
        });

        component.vm.submitCart();

        expect(storeCommitSpy).toHaveBeenCalledWith(SET_ERROR, 'Something went wrong');
      });
    });
  });
});
