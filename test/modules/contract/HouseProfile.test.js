import {mount} from 'vue-test-utils'
import HouseProfile from '../../../modules/contract/HouseProfile.vue'

describe('HouseProfile', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(HouseProfile, {
		propsData: {
			property: {
				houseType: 1,
				house: ''
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="全部" value="1"></el-option>')
	})


	it('should have some options', () => {
		expect(wrapper.contains('el-option')).toBe(true)
	})
})