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
  });

  it('should render gender options', () => {
    expect(wrapper.html()).toContain('<el-option label="男" value="M"></el-option>');
    expect(wrapper.html()).toContain('<el-option label="女" value="F"></el-option>')
  });


  it('should have some inputs', () => {
    expect(wrapper.contains('el-input')).toBe(true)
  });

  it('should limit document length to 18', () => {
    expect(wrapper.vm.fieldLengthOf()).toBe(18)
  });

  it('should validate mobile', () => {
    const callback = jest.fn();
    wrapper.vm.validateMobile('rule', '132', callback);
    expect(callback).toHaveBeenCalledWith(new Error('手机号输入错误'));
  });

  it('should accept valid mobile', () => {
    const callback = jest.fn();
    wrapper.vm.validateMobile('rule', '13288887777', callback);
    expect(callback).toHaveBeenCalled();
  });

  it('should reject empty mobile', () => {
    const callback = jest.fn();
    wrapper.vm.validateMobile('rule', '', callback);
    expect(callback).toHaveBeenCalledWith(new Error('请输入手机号'));
  });

  it('should reject too long mobile', () => {
    const callback = jest.fn();
    wrapper.vm.validateMobile('rule', '132888877771', callback);
    expect(callback).toHaveBeenCalledWith(new Error('手机号输入错误'));
  });
  it('should reject too short mobile', () => {
    const callback = jest.fn();
    wrapper.vm.validateMobile('rule', '1328888777', callback);
    expect(callback).toHaveBeenCalledWith(new Error('手机号输入错误'));
  })
});
