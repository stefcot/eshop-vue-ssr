import { createRenderer } from 'vue-server-renderer';
import { shallow } from 'vue-test-utils';
import BaseButton from './BaseButton';

test('BaseButton snapshot', () => {
  const renderer = createRenderer();
  const wrapper = shallow(BaseButton, {
    propData: {
      icon: 'add',
      disabled: true,
      badge: '3'
    },
    // Slot contents
    slots: {
      default: '<span>Add item</span>'
    }
  });

  renderer.renderToString(wrapper.vm, (err, str) => {
    if (err) {
      throw new Error(err);
    }
    expect(str).toMatchSnapshot();
  });
});
