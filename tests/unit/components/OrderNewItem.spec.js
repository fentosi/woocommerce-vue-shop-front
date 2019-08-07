import { mount, shallowMount } from '@vue/test-utils';
import OrderNewItem from '../../../src/components/OrderNewItem';
import { createStore } from '../../../src/store';
import { ADD_ITEM_TO_CART } from '../../../src/store/mutationTypes';
import Popper from 'vue-popperjs';

describe('OrderNewItem.vue', () => {
  let component;

  const item = {
    id: 12,
    name: 'Item',
    type: 'simple',
    short_description: 'description',
    price_html: 'price',
    images: [
      { src: 'asd' }
    ],
    variations: [],
    variationsData: [],
    stock_quantity: null
  };

  const itemWithVariation = {
    id: 14,
    name: 'Item',
    type: 'variation',
    short_description: 'description',
    price_html: 'price',
    images: [
      { src: 'asd' }
    ],
    variations: [22, 23],
    variationsData: [
      {
        id: 22,
        attributes:
        [
          { id: 1, name: 'Size', option: 'S' }
        ],
        stock_quantity: 3
      },
      {
        id: 33,
        attributes:
          [
            { id: 1, name: 'Size', option: 'M' }
          ],
        stock_quantity: 1
      }
    ],
    stock_quantity: null
  };

  describe('addToCart', () => {
    let store;

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

  describe('addVariationToCart', () => {
    let store;

    it('calls ADD_ITEM_TO_CART mutation', () => {
      const expectedParameters = {
        productId: item.id,
        variationId: item.variations[0],
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

      component.vm.addVariationToCart(item.variations[0]);

      expect(store.commit).toHaveBeenCalledWith(ADD_ITEM_TO_CART, expectedParameters);
    });
  });

  describe('isVariationLoading', () => {
    let store;

    beforeEach(() => {
      store = createStore();
      store.state.products = { [item.id]: item };
    });

    it('should return true if variations are loading', () => {
      store.state.variationLoading = {
        [item.id]: true
      };

      component = shallowMount(OrderNewItem, {
        mocks: {
          $store: store
        },
        propsData: {
          ...item
        },
        components: {
          'popper': Popper
        }
      });

      expect(component.vm.isVariationLoading).toBe(true);
    });

    it('should return false if variation isn\'t loading', () => {
      store.state.variationLoading = {
        [item.id]: false
      };

      component = shallowMount(OrderNewItem, {
        mocks: {
          $store: store
        },
        propsData: {
          ...item
        },
        components: {
          'popper': Popper
        }
      });

      expect(component.vm.isVariationLoading).toBe(false);
    });
  });

  describe('item without variation', () => {
    let store;

    it('should not contain popover', () => {
      store = createStore();
      store.state.products = { [item.id]: item };

      component = mount(OrderNewItem, {
        mocks: {
          $store: store
        },
        propsData: {
          ...item
        },
        components: {
          'popper': Popper
        }
      });

      expect(component.contains(Popper)).toBe(false);
    });
  });

  describe('Item has variations', () => {
    let store;
    let component;

    beforeEach(() => {
      store = createStore();
      store.state.products = { [itemWithVariation.id]: itemWithVariation };

      component = mount(OrderNewItem, {
        mocks: {
          $store: store
        },
        propsData: {
          ...itemWithVariation
        },
        components: {
          'popper': Popper
        }
      });
    });

    it('should contain popover component', () => {
      expect(component.contains(Popper)).toBe(true);
    });

    it('popover should contain buttons for attributes', () => {
      let attributeButtons = component.find(Popper).find('.popper').findAll('button');
      expect(attributeButtons.length).toBe(itemWithVariation.variationsData.length);
    });
  });

  describe('getVariations', () => {
    let store;

    beforeEach(() => {
      store = createStore();
    });

    it('should return an array of variations', () => {
      const expectedVariations = [
        {
          id: itemWithVariation.variationsData[0].id,
          name: itemWithVariation.variationsData[0].attributes[0].name + ' - ' +
            itemWithVariation.variationsData[0].attributes[0].option,
          stock: itemWithVariation.variationsData[0].stock_quantity
        },
        {
          id: itemWithVariation.variationsData[1].id,
          name: itemWithVariation.variationsData[1].attributes[0].name + ' - ' +
            itemWithVariation.variationsData[1].attributes[0].option,
          stock: itemWithVariation.variationsData[1].stock_quantity
        }

      ];
      store.state.products = { [itemWithVariation.id]: itemWithVariation };

      component = mount(OrderNewItem, {
        mocks: {
          $store: store
        },
        propsData: {
          ...itemWithVariation
        },
        components: {
          'popper': Popper
        }
      });

      expect(component.vm.getVariations).toEqual(expectedVariations);
    });
  });
});
