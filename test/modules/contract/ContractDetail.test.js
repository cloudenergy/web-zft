import {mount} from 'vue-test-utils'
import ContractDetail from '../../../modules/contract/ContractDetail.vue'
import moment from 'moment'

describe('ContractDetail', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(ContractDetail, {
		propsData: {
			contract: {
				leaseStart: moment().format('YYYY-MM-DD'),
				leaseEnd: moment().add(3, 'months').format('YYYY-MM-DD'),
				contractNumber: '',
				signUpDate: moment().format('YYYY-MM-DD')
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<div class="block lease-start-input"><el-date-picker type="date" placeholder="起租时间"></el-date-picker>')
		expect(wrapper.html()).toContain('<el-date-picker type="date" placeholder="选择日期"></el-date-picker>')
	})


	it('should have a range label', () => {
		expect(wrapper.contains('span.el-input-group__prepend')).toBe(true)
	})
})