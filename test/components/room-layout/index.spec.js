import {createLocalVue, mount} from '@vue/test-utils';
import RoomLayout from '../../../components/room-layout/index';

import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('RoomLayout', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = mount(RoomLayout, {
    localVue
  });

  it('should have some options', () => {
    expect(wrapper.html('room-manager')).toContain(
      '<div class="el-input-group__append">间</div>');
  });
});
