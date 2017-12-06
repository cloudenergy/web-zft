<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="130">
    </el-table-column>
    <!-- <el-table-column
      prop="name"
      label="姓名"
      width="130">
    </el-table-column> -->
    <el-table-column
      prop="type"
      label="类型"
      width="130">
    </el-table-column>
    <el-table-column
      prop="money"
      label="金额"
      color="green">
    </el-table-column>
    <el-table-column
      prop="payload"
      label="支付方式">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          type: '电费',
          money: '100',
          payload: '支付宝',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          type: '电费',
          money: '100',
          payload: '支付宝',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          type: '电费',
          money: '100',
          payload: '支付宝',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          type: '水费',
          money: '100',
          payload: '支付宝',
        }]
      }
    }
  }
</script>