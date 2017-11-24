import { mount } from 'vue-test-utils';
import ContractDetail from '../../../modules/contract/ContractDetail.vue';
import { addMonths, format, chain } from '~/utils/date';

describe('ContractDetail', () => {
	const today = new Date();
	let leaseEnd;
	chain(today)
		.then(addMonths(3))
		.then(format('YYYY-MM-DD'))
		.then(date => (leaseEnd = date));
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(ContractDetail, {
		propsData: {
			contract: {
				leaseStart: format('YYYY-MM-DD')(today),
				leaseEnd,
				contractNumber: '',
				signUpDate: format('YYYY-MM-DD')(today)
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
