import {mount} from 'vue-test-utils'
import DataTable from '../../../modules/bill/data-table'

describe('DataTable', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(DataTable)

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-table-column label="应支付日" width="150"></el-table-column>')
		expect(wrapper.html()).toContain('<el-table-column label="房源/租期"></el-table-column>')
		expect(wrapper.html()).toContain('<el-table-column label="金额(¥)/账期" width="150"></el-table-column>')
		expect(wrapper.html()).toContain('<el-table-column label="操作" width="150"></el-table-column>')

	})


	it('should have some table element', () => {
		expect(wrapper.contains('el-table')).toBe(true)
		expect(wrapper.contains('el-table-column')).toBe(true)
	})

})