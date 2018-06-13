import {mount} from 'vue-test-utils'
import Electricit from '../../../modules/devices/electricit.vue'


describe('Electricit', () => {
	const wrapper = mount(Electricit, {
		propsData: {
			houseFormat: 'SHARE',
			readingElectric: [{index: 1}],

		}
	});
	it('should have row-key', () => {
		expect(wrapper.html()).toContain(
			'<el-table-column type="expand">'
		)
	})

	it('should have return el-table key', () => {
		expect(wrapper.vm.getRowKeys({'index': '1'})).toBe('1');
	});
})
