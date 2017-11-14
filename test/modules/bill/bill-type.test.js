import {mount} from 'vue-test-utils'
import BillType from '../../../modules/bill/bill-type'

describe('BillType', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(BillType)

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="全部" value="all"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="租约" value="prepaid"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="记账" value="postpaid"></el-option>')
	})


	it('should have some options', () => {
		expect(wrapper.contains('el-option')).toBe(true)
	})
})