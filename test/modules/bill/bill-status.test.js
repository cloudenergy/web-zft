import {mount} from 'vue-test-utils'
import BillStatus from '../../../modules/bill/bill-status'

describe('BillStatus', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(BillStatus)

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-menu-item index="false">未完成</el-menu-item>')
		expect(wrapper.html()).toContain('<el-menu-item index="true">已完成</el-menu-item>')
	})


	it('should have a menu item', () => {
		expect(wrapper.contains('el-menu-item')).toBe(true)
	})
})