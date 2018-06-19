import {createLocalVue, mount} from '@vue/test-utils'
import ElementUI from 'element-ui';
import DataTable from '../../../modules/bill/data-table'
import subDays from 'date-fns/sub_days'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('DataTable of bills', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = mount(DataTable, {
    localVue,
    mocks: {
      $model: () => ({query: () => Promise.resolve([])}),
      $store: {
        dispatch: () => Promise.resolve([]),
        state: {
          user: {
            projectId: 100
          }
        }
      }
    },
    propsData: {
      pagingSize: {
        count:100
      }
    }
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf"><div class="cell">应支付日</div></th>')
    expect(wrapper.html()).toContain('<div class="cell">房源/账期</div>')
    expect(wrapper.html()).toContain('<div class="cell">金额(¥)/类型</div>')
    expect(wrapper.html()).toContain('<div class="cell">操作</div>')
  })


  it('should have some table element', () => {
    expect(wrapper.html()).toContain('<div class="el-table')
    expect(wrapper.html()).toContain('<thead class="">')
    expect(wrapper.html()).toContain('<tbody>')
  })

  it('should check if bill is overdue', () => {
    const aTime = new Date(1529414514000)
    const bTime = 1528014514
    expect(wrapper.vm.isOverdue(aTime, {dueDate: bTime})).toBe(true)
  })

  it('should display bill overdue time in days', () => {
    const aTime = new Date(1529414514000)
    const bTime = 1528014514
    expect(wrapper.vm.overdueDays(aTime, bTime)).toBe(16)
  })


})
