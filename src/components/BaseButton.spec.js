import { shallow } from 'vue-test-utils';
import BaseButton from './BaseButton';

// Test suite for BaseButton component
describe('BaseButton', () => {
  test('Click button', () => {
    const wrapper = shallow(BaseButton);
    wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
