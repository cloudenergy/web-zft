import {createLocalVue, mount} from '@vue/test-utils'
import ElementUI from 'element-ui';
import DataTable from '../../../modules/bill/data-table'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('DataTable of bills', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = mount(DataTable, {
    attachToDocument: true,
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
        count: 100
      },
      tableBill: [{
        room: {},
        payments: [],
        dueDate: 1529419395, user: {
          name: '老王'
        }
      }, {
        room: {},
        payments: [],
        dueDate: 1522419395, user: {
          name: '老张'
        }
      }]
    }
  })

  it('should render the correct markup', () => {
    expect(wrapper.html()).toContain('<th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf"><div class="cell">应支付日</div></th>')
    expect(wrapper.html()).toContain('<div class="cell">房源/账期</div>')
    expect(wrapper.html()).toContain('<div class="cell">金额(¥)/类型</div>')
    expect(wrapper.html()).toContain('<div class="cell">操作</div>')
  })

  it('should render the correct content', () => {
    expect(wrapper.html()).toContain('<span size="medium">老王</span>')
    expect(wrapper.html()).toContain('<div class="cell"><p style="color: red;">已逾期')
    expect(wrapper.text()).toContain('收款')
  })


  it('should have some table element', () => {
    expect(wrapper.html()).toContain('<div class="el-table')
    expect(wrapper.html()).toContain('<thead class="">')
    expect(wrapper.html()).toContain('<tbody>')
  })

  it('should check if bill is overdue', () => {
    const aTime = new Date(1529414514000)
    const bEpoch = 1528014514
    expect(wrapper.vm.isOverdue(aTime, {dueDate: bEpoch})).toBe(true)
  })

  it('should display bill overdue time in days', () => {
    const aTime = new Date(1529414514000)
    const bTime = new Date(1528014514000)
    expect(wrapper.vm.overdueDays(aTime, bTime)).toBe(16)
  })

  it('should display scaled down price', () => {
    expect(wrapper.vm.price(1012)).toBe('10.12')
    expect(wrapper.vm.price(101)).toBe('1.01')
    expect(wrapper.vm.price(1000000)).toBe('10000.00')
    expect(wrapper.vm.price(0.01)).toBe('0.00')
  })
})
