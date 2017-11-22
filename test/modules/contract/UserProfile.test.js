import {mount} from 'vue-test-utils'
import UserProfile from '../../../modules/contract/UserProfile.vue'

describe('UserProfile', () => {
	// Now mount the component, and you have the wrapper.
	const wrapper = mount(UserProfile, {
		propsData: {
			profile: {
				name: 'aaa',
				account: '',
				phone: '',
				gender: 1,
				idNumber: '',
				idType: 1
			}
		}
	});

	it('should render the correct markup', () => {
		expect(wrapper.html()).toContain('<el-option label="身份证" value="1"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="护照" value="2"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="港澳通行证" value="3"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="台胞证" value="4"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="居住证" value="5"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="临时居住证" value="6"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="营业执照" value="7"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="其他证件" value="8"></el-option>')
	})

	it('should render gender options', () => {
		expect(wrapper.html()).toContain('<el-option label="男" value="1"></el-option>')
		expect(wrapper.html()).toContain('<el-option label="女" value="0"></el-option>')
	})


	it('should have some inputs', () => {
		expect(wrapper.contains('el-input')).toBe(true)
	})
})