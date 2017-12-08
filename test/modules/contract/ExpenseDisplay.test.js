import {mount} from 'vue-test-utils'
import ExpenseDisplay from '../../../modules/contract/ExpenseDisplay.vue'

describe('ExpenseDisplay', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(ExpenseDisplay, {
		propsData: {
			expense: {
				billPlan: 1,
				offset: '',
				standard: {
					configId: 1,
					name: '常规租金',
					rent: 3600,
					pattern: '1',
				},
				extra: [
					{
						configId: 2,
						name: '电费',
						rent: 1.20,
						pattern: 'prepaid',
					},
					{
						configId: 3,
						name: '水费',
						rent: 20,
						pattern: 'withRent',
					}
				],
				bond: 2600
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="预付费" value="prepaid">')
		expect(wrapper.html()).toContain('<el-option label="一月一付" value="1">')
	})


	it('should have a prepend label', () => {
		expect(wrapper.contains('span.el-input-group__prepend')).toBe(true)
	})
})