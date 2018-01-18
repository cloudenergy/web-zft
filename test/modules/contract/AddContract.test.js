import {mount, shallow} from 'vue-test-utils';
import AddContract from '../../../modules/contract/AddContract.vue';
import {format} from 'date-fns';


describe('AddContract', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = shallow(AddContract, {
		mocks: {
			$model: () => ({query: () => Promise.resolve([])}),
			$store: {
				dispatch: () => Promise.resolve([])
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain(
			'<el-form model="[object Object]" class="v-form">'
		);
		expect(wrapper.html()).toContain(
			'<h3>承租信息</h3>'
		);
		expect(wrapper.html()).toContain(
			'<h3 class="section-2">租费设置</h3>'
		);
	});

	it('should have a dialog footer', () => {
		expect(wrapper.contains('div.dialog-footer')).toBe(true);
	});

	it('should compute different end contract spots base on leaseStart date', () => {
		expect(format(wrapper.vm.defaultStart('2018-11-11'), 'YYYY-MM-DD')).toBe('2018-11-11');
		expect(format(wrapper.vm.defaultEnd('2018-11-11'), 'YYYY-MM-DD')).toBe('2019-11-11');
	});

});
