<template>
  <el-table
    :data="form"
    stripe
    style="width: 2017-01-01%">
    <el-table-column
      prop="type"
      label="类型"
      width="80">
    </el-table-column>
    <el-table-column
      label="账期"
      width="240">
      <template slot-scope="scope">
        <span>{{scope.row.startDate}}</span>至<span>{{scope.row.endDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="dueAmount"
      label="金额"
      width="80">
    </el-table-column>
    <el-table-column
      prop="dueDate"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="状态"
      width="80">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
            form: {
                type: Array
          }
    },
    data() {
      return {
        tableData: [{
          type: 'NO.2',
          stype: '已完成',
          alltime: '2017-01-01——2017-02-02',
          agoread: '10000',
          paytime: '2017-01-01'
        }, {
          type: 'NO.4',
          stype: '已完成',
          alltime: '2017-01-01——2017-02-02',
          agoread: '10',
          paytime: '2017-01-01'
        }, {
          type: 'NO.1',
          stype: '已完成',
          alltime: '2017-01-01——2017-02-02',
          agoread: '10',
          paytime: '2017-01-01'
        }, {
          type: 'NO.3',
          stype: '已完成',
          alltime: '2017-01-01——2017-02-02',
          agoread: '10',
          paytime: '2017-01-01'
        }]
      }
    }
  }
</script>