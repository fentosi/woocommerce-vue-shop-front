import Navbar from '../../../src/components/Navbar';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('Navbar.vue', () => {
  it('renders menu items', () => {
    const component = shallowMount(Navbar, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(component.findAll('.nav-item').length).toBe(1);
    expect(component.find('.nav-item a:nth-child(1)').text()).toBe('Orders');
  });
});
