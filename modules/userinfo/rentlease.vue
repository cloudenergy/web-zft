<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 2017-01-01%">
    <el-table-column
      prop="type"
      label="类型"
      width="80">
    </el-table-column>
    <el-table-column
      prop="alltime"
      label="账期"
      width="240">
    </el-table-column>
    <el-table-column
      prop="agoread"
      label="金额"
      width="80">
    </el-table-column>
    <el-table-column
      prop="paytime"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="stype"
      label="状态"
      width="80">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
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