import { shallowMount } from '@vue/test-utils';
import { createStore } from '../../../src/store';
import OrderNew from '../../../src/views/OrderNew';
import OrderNewItem from '../../../src/components/OrderNewItem';
import productsRepository from '../../../src/repositories/products';

describe('OrderNew.vue', () => {
  let component;
  let store;
  let productRepositoryGetAllMock;

  const product = {
    id: 4877,
    name: 'Extra Bass Headphones',
    slug: 'extra-bass-headphones',
    permalink: 'http://localhost:8888/shop/extra-bass-headphones/',
    type: 'variable',
    status: 'publish',
    short_description: '<p>Description</p>',
    sku: '015',
    price: '199',
    manage_stock: false,
    stock_quantity: null,
    stock_status: 'instock',
    images: [
      {
        id: 4878,
        src: 'http://localhost:8888/wp-content/uploads/2016/07/extra-bass-headphones.jpg',
        name: 'extra-bass-headphones'
      }
    ],
    attributes: [
      {
        id: 1,
        name: 'Size',
        position: 0,
        visible: true,
        variation: true,
        options: [
          'S',
          'M',
          'L',
          'XL'
        ]
      }
    ],
    variations: [
      5798,
      5799,
      5800,
      5801
    ]
  };

  beforeEach(() => {
    productRepositoryGetAllMock = jest.spyOn(productsRepository, 'getAll').mockImplementation(() => {
      return { data: [product] };
    });
    store = createStore();
    store.state.products = [product];
    component = shallowMount(OrderNew, {
      mocks: {
        $store: store
      }
    });
  });

  it('renders OrderNewItem list items', () => {
    expect(component.contains(OrderNewItem)).toBe(true);
  });

  it('loads products on created hook', () => {
    expect(productRepositoryGetAllMock).toHaveBeenCalled();
  });
});
