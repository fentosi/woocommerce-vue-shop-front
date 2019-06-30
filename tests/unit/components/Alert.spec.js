import { shallowMount } from '@vue/test-utils';
import Alert from '../../../src/components/Alert';
import { createStore } from '../../../src/store';
import { UNSET_ERROR } from '../../../src/store/mutationTypes';

describe('Alert.vue', () => {
  it('renders message prop', () => {
    const message = 'Test message';
    const component = shallowMount(Alert, {
      propsData: {
        message: message
      }
    });
    expect(component.find('span').text()).toBe(message);
  });

  describe('close', () => {
    it('unset error', () => {
      let store = createStore();
      jest.spyOn(store, 'commit');

      const component = shallowMount(Alert, {
        mocks: {
          $store: store
        }
      });

      component.vm.close();

      expect(store.commit).toHaveBeenCalledWith(UNSET_ERROR);
    });
  });
});
