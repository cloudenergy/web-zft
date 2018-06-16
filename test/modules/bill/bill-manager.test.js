import { mount } from 'vue-test-utils';
import BillManager from '../../../modules/bill/bill-manager';

describe('BillManager', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = mount(BillManager);

  it('should have some options', () => {
    expect(wrapper.contains('room-manager')).toBe(true);
  });
});
