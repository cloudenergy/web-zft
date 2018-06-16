import {mount, shallow} from 'vue-test-utils'
import DataTable from '../../../modules/bill/data-table'

describe('DataTable', () => {
  // Now mount the component, and you have the wrapper.
  const wrapper = shallow(DataTable, {
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
    expect(wrapper.html()).toContain('<el-table-column label="应支付日" width="200"></el-table-column>')
    expect(wrapper.html()).toContain('<el-table-column label="房源/账期"></el-table-column>')
    expect(wrapper.html()).toContain('<el-table-column label="金额(¥)/类型"></el-table-column>')
    expect(wrapper.html()).toContain('<el-table-column label="操作"></el-table-column>')

  })


  it('should have some table element', () => {
    expect(wrapper.contains('el-table')).toBe(true)
    expect(wrapper.contains('el-table-column')).toBe(true)
  })

})