import {createLocalVue, mount} from '@vue/test-utils'
import ElementUI from 'element-ui';
import TopupHistory from '../../../modules/userinfo/TopupHistory.vue'

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.component('el-table', ElementUI.ElTable);

describe('TopupHistory', () => {
  const options = {
    localVue,
    propsData: {
      houseFormat: 'SHARE',
      readingElectric: [{index: 1, location: {}, details: [{device: {deviceId: 'YTL11223344'}}]}],

    }
  };
  const wrapper = mount(TopupHistory, options);
  it('should have row-key', () => {
    expect(wrapper.html()).toContain(
      '<td class="el-table_1_column_1  el-table__expand-column"><div class="cell"><div class="el-table__expand-icon "><i class="el-icon el-icon-arrow-right"></i></div></div></td>'
    )
  });

  it('should hide deviceID prefix', () => {
    expect(wrapper.html()).toContain(
      '<td class="el-table_1_column_3  "><div class="cell"><span>11223344</span> <br></div></td>'
    )
  });

  it('should have return el-table key', () => {
    expect(wrapper.vm.getRowKeys({'index': '1'})).toBe('1');
  });
});
