import { shallowMount } from '@vue/test-utils';
import { createStore } from '../../../src/store';
import OrderNew from '../../../src/views/OrderNew';
import OrderNewItem from '../../../src/components/OrderNewItem';
import productsRepository from '../../../src/repositories/products';
import Loader from '../../../src/components/Loader';
import { SET_ERROR } from '../../../src/store/mutationTypes';
jest.mock('../../../src/repositories/products');

describe('OrderNew.vue', () => {
  let component;
  let store;
  let productRepositoryGetAllMock;
  let storeCommitSpy;

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
  const productList = {};

  beforeEach(() => {
    productList[product.id] = product;
    productRepositoryGetAllMock = jest.spyOn(productsRepository, 'getAll').mockImplementationOnce(() => {
      return { data: [product] };
    }).mockImplementationOnce(() => {
      throw new Error();
    });

    store = createStore();
    storeCommitSpy = jest.spyOn(store, 'commit').mockImplementation();
    store.state.products = [product];
    component = shallowMount(OrderNew, {
      mocks: {
        $store: store
      }
    });
  });

  afterEach(() => {
    productRepositoryGetAllMock.mockReset();
    storeCommitSpy.mockRestore();
  });

  it('renders OrderNewItem list items', () => {
    expect(component.contains(OrderNewItem)).toBe(true);
  });

  it('loads products on created hook', () => {
    expect(productRepositoryGetAllMock).toHaveBeenCalled();
  });

  it('sets loading on loadProducts', async () => {
    const promise = component.vm.loadProducts();

    expect(component.vm.isLoading).toEqual(true);
    expect(component.contains(Loader)).toBe(true);

    await promise;

    expect(component.vm.isLoading).toEqual(false);
    expect(component.contains(Loader)).toBe(false);
  });

  it('sets error if loading is failed', async () => {
    await component.vm.loadProducts();

    expect(storeCommitSpy).toHaveBeenCalledWith(SET_ERROR, 'Something went wrong');
  });
});
