import {mount} from 'vue-test-utils'
import DataTable from '../../../modules/bill/data-table'

describe('DataTable', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(DataTable)

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-table-column label="最后缴费日期" width="180"></el-table-column>')
		expect(wrapper.html()).toContain('<el-table-column label="房源/租期"></el-table-column>')
		expect(wrapper.html()).toContain('<el-table-column label="账号/余额(¥)" width="120"></el-table-column>')
		expect(wrapper.html()).toContain('<el-table-column label="Operations" width="120"></el-table-column>')

	})


	it('should have some table element', () => {
		expect(wrapper.contains('el-table')).toBe(true)
		expect(wrapper.contains('el-table-column')).toBe(true)
	})

	it('should have some dialogs', () => {
		expect(wrapper.contains('el-dialog')).toBe(true)
	})
})