import { mount } from 'vue-test-utils';
import ContractDetail from '../../../modules/contract/ContractDetail.vue';
import { format } from '~/utils/date';

describe('ContractDetail', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(ContractDetail, {
		propsData: {
			contract: {
				leaseStart: '2017-11-11',
				leaseEnd: '',
				contractNumber: '',
				signUpDate: '2017-12-12'
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain(
			'<el-date-picker type="date" placeholder="起租时间" picker-options="[object Object]"></el-date-picker>'
		);
		expect(wrapper.html()).toContain(
			'<el-date-picker type="date" placeholder="选择日期"></el-date-picker>'
		);
	});

	it('should have a range label', () => {
		expect(wrapper.contains('span.el-input-group__prepend')).toBe(true);
	});

	it('should compute different end contract spots base on leaseStart date', () => {
		expect(format('YYYY-MM-DD')(wrapper.vm.sixMonthsLength)).toBe('2018-05-11');
		expect(format('YYYY-MM-DD')(wrapper.vm.oneYearLength)).toBe('2018-11-11');
		expect(format('YYYY-MM-DD')(wrapper.vm.twoYearsLength)).toBe('2019-11-11');
		expect(format('YYYY-MM-DD')(wrapper.vm.threeYearsLength)).toBe('2020-11-11');
	});

	it('should compute one year end date on lease start option', () => {
		wrapper.setProps({ contract: {
			leaseStart: '2018-05-11',
			leaseEnd: '',
			contractNumber: '',
			signUpDate: '2017-12-12'
		} })

		expect(format('YYYY-MM-DD')(wrapper.vm.oneYearLength)).toBe('2019-05-11');
	});
});
