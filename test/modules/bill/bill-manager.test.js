import {mount} from 'vue-test-utils'
import BillManager from '../../../modules/bill/bill-manager'

describe('BillManager', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(BillManager)

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="老蒋" value="laojiang"></el-option>')
	})


	it('should have some options', () => {
		expect(wrapper.contains('el-option')).toBe(true)
	})
})