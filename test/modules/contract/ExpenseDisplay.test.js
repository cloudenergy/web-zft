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
					id: 1,
					name: '常规租金',
					type: '2',
					amount: 3600,
					paymentMethod: 'perMonth',
				},
				extra: [
					{
						id: 2,
						name: '电费',
						type: '2',
						amount: 1.20,
						paymentMethod: 'prepaid',
					},
					{
						id: 3,
						name: '水费',
						type: 'water',
						amount: 20,
						paymentMethod: '随租金付',
					}
				],
				bond: 2600
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="预付费" value="prepaid">')
		expect(wrapper.html()).toContain('<el-option label="一月一付" value="perMonth">')
	})


	it('should have a prepend label', () => {
		expect(wrapper.contains('span.el-input-group__prepend')).toBe(true)
	})
})