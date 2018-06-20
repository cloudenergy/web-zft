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
      form: {},
    },
    data: () => ({
      topupRecords: [{
        time: 1529158151, amount: 1234, balance: 4321, operator: '老王'
      }],
      pagination: {size: 15, count: 6, index: 1},
    }),
    methods: {
      refresh() {
      }
    },
    mocks: {
      $model: () => ({
        query: () => Promise.resolve({})
      }),
      $store: {
        state: {
          userInfo: {user: {projectId: 123}}
        }
      }
    }
  };
  const wrapper = mount(TopupHistory, options);
  it('should render table structure', () => {
    expect(wrapper.html()).toContain(
      '<table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 470px;"><colgroup><col name="el-table_1_column_1" width="150"><col name="el-table_1_column_2" width="80"><col name="el-table_1_column_3" width="80"><col name="el-table_1_column_4" width="80"><col name="el-table_1_column_5" width="80"></colgroup><thead class=""><tr class=""><th colspan="1" rowspan="1" class="el-table_1_column_1     is-leaf"><div class="cell">日期</div></th><th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf"><div class="cell">充值金额</div></th><th colspan="1" rowspan="1" class="el-table_1_column_3     is-leaf"><div class="cell">账户余额</div></th><th colspan="1" rowspan="1" class="el-table_1_column_4     is-leaf"><div class="cell">支付方式</div></th><th colspan="1" rowspan="1" class="el-table_1_column_5     is-leaf"><div class="cell">经办人</div></th></tr></thead></table>'
    )

  });

  it('should render content', () => {
    expect(wrapper.html()).toContain(
      '<div class="cell">老王</div>'
    );
    expect(wrapper.text()).toContain(
      '12.34'
    )
    expect(wrapper.text()).toContain(
      '43.21'
    )
  });
});
