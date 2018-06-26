import {createLocalVue, mount} from '@vue/test-utils'
import ElementUI from 'element-ui';
import Electricit from '../../../modules/devices/electricit.vue'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Electricit', () => {
  const options = {
    localVue,
    propsData: {
      houseFormat: 'SHARE',
      readingElectric: [{index: 1, location: {}, details: [{device: {deviceId: 'YTL11223344'}}]}],
    }
  };
  const wrapper = mount(Electricit, options);
  it('should have row-key', () => {
    expect(wrapper.html()).toContain(
      '<td class="el-table_1_column_2  el-table__expand-column"><div class="cell"><div class="el-table__expand-icon "><i class="el-icon el-icon-arrow-right"></i></div></div></td>'
    )
  });

  it('should hide deviceID prefix', () => {
    expect(wrapper.html()).toContain(
      '<td class="el-table_1_column_4  "><div class="cell"><span>11223344</span> <br></div></td>'
    )
  });

  it('should have return el-table key', () => {
    expect(wrapper.vm.getRowKeys({'index': '1'})).toBe('1');
  });
});
