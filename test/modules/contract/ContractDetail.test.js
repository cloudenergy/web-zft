import { mount } from 'vue-test-utils';
import ContractDetail from '../../../modules/contract/ContractDetail.vue';
import { date } from '~/utils';
const { addMonths, format } = date;
import chain from 'lodash/chain';

describe('ContractDetail', () => {
	const today = new Date();
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(ContractDetail, {
		propsData: {
			contract: {
				leaseStart: format(today, 'YYYY-MM-DD'),
				leaseEnd: chain(today)
					.addMonths(3)
					.format('YYYY-MM-DD'),
				contractNumber: '',
				signUpDate: format(today, 'YYYY-MM-DD')
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain(
			'<div class="block lease-start-input prepend-label"><el-date-picker type="date" placeholder="起租时间"></el-date-picker>'
		);
		expect(wrapper.html()).toContain(
			'<el-date-picker type="date" placeholder="选择日期"></el-date-picker>'
		);
	});

	it('should have a range label', () => {
		expect(wrapper.contains('span.el-input-group__prepend')).toBe(true);
	});
});
