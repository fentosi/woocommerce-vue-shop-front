import { shallowMount } from '@vue/test-utils';
import OrderNewItem from '../../../src/components/OrderNewItem';
import { createStore } from '../../../src/store';
import { ADD_ITEM_TO_CART } from '../../../src/store/mutationTypes';

describe('OrderNewItem.vue', () => {
  let store;

  const item = {
    id: 12,
    name: 'Item',
    type: 'simple',
    short_description: 'description',
    price_html: 'price',
    images: [
      { src: 'asd' }
    ],
    stock_quantity: null
  };

  describe('addToCart', () => {
    it('calls ADD_ITEM_TO_CART mutation', () => {
      const expectedParameters = {
        productId: item.id,
        variationId: null,
        quantity: 1
      };

      store = createStore();
      jest.spyOn(store, 'commit');
      const component = shallowMount(OrderNewItem, {
        mocks: {
          $store: store
        },
        propsData: {
          ...item
        }
      });

      component.vm.addToCart();

      expect(store.commit).toHaveBeenCalledWith(ADD_ITEM_TO_CART, expectedParameters);
    });
  });
});
