import {mount} from 'vue-test-utils'
import ExpenseSetting from '../../../modules/contract/ExpenseSetting.vue'

describe('ExpenseSetting', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(ExpenseSetting, {
		propsData: {
			expense: {
				billPlan: '-',
				offset: 1,
				standard: {
					id: 1,
					name: '常规租金',
					type: '2',
					amount: 3600,
					paymentMethod: '一月一付',
				},
				extra: [
					{
						id: 2,
						name: '电费',
						type: '2',
						amount: 1.20,
						paymentMethod: '预付费',
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
		expect(wrapper.html()).toContain('<el-option label="1天" value="01">')
		expect(wrapper.html()).toContain('<el-option label="30天" value="30">')
		expect(wrapper.html()).toContain('<el-option label="开始前提前" value="-"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="开始后固定" value="+"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="开始前固定" value="F"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="开始前一个月固定" value="M"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="一年一付" value="6">')
	})


	it('should have a prepend label', () => {
		expect(wrapper.contains('span.el-input-group__prepend')).toBe(true)
	})

	it('should calculate date unit base on bill plan 1', () => {
		const billPlan1 = mount(ExpenseSetting, {
			propsData: {
				expense: {
					billPlan: '-',
					offset: 1,
					standard: {},
					extra: [],
					bond: 0
				}
			}
		});
		expect(billPlan1.vm.unitOfDate).toBe('天')
	})

	it('should calculate date unit base other than bill plan 1', () => {
		const billPlan2 = mount(ExpenseSetting, {
			propsData: {
				expense: {
					billPlan: 'F',
					offset: 1,
					standard: {},
					extra: [],
					bond: 0
				}
			}
		});
		expect(billPlan2.vm.unitOfDate).toBe('号')
	})
})