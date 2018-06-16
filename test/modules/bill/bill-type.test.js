import { mount } from 'vue-test-utils';
import BillType from '../../../modules/bill/bill-type';

describe('BillType', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = mount(BillType);

  it('should have some options', () => {
    expect(wrapper.contains('bill-type')).toBe(true);
  });
});
