import {mount} from 'vue-test-utils'
import UserProfile from '../../../modules/contract/UserProfile.vue'

describe('UserProfile', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(UserProfile, {
		propsData: {
			user: {
				name: 'aaa',
				accountName: '',
				phone: '',
				gender: 'F',
				documentId: '',
				documentType: 1
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="身份证" value="1"></el-option>')
	})

	it('should render gender options', () => {
		expect(wrapper.html()).toContain('<el-option label="男" value="M"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="女" value="F"></el-option>')
	})


	it('should have some inputs', () => {
		expect(wrapper.contains('el-input')).toBe(true)
	})
})