import {mount} from 'vue-test-utils'
import BillStatus from '../../../modules/bill/bill-status'

describe('BillStatus', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = mount(BillStatus)

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<el-tab-pane label="未完成" name="false"></el-tab-pane>')
    expect(wrapper.html()).toContain('<el-tab-pane label="已完成" name="true"></el-tab-pane>')
  })


  it('should have a menu item', () => {
    expect(wrapper.contains('el-tab-pane')).toBe(true)
  })
})