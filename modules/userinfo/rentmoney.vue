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
      label="金额">
    </el-table-column>
    <el-table-column
      prop="agoread"
      label="读数">
    </el-table-column>
    <el-table-column
      prop="thisread"
      label="用量">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: {
      form: {
        required:true
      }
    },
    computed: {
      projectId(){
        return this.$store.state.user.projectId
      }
    },
    data() {
      return {
        bills:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          type: '电费',
          money: '100',
          agoread: '10',
          thisread: '100'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          type: '电费',
          money: '100',
          agoread: '10',
          thisread: '100'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          type: '电费',
          money: '100',
          agoread: '10',
          thisread: '100'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          type: '水费',
          money: '100',
          agoread: '10',
          thisread: '100'
        }]
      }
    },
    created () {
      this.query()
    },
    methods: {
      query(){
        this.$model('paid_bills')
        .query({
          mode:'topup',
          index:1,
          size:15
        },
        {
          projectId:this.projectId,
          contractId:this.form.id
        })
        .then(res=>{
          console.log(res)
          // this.$set(this, 'bills', res.data || []);
        })
      }
    }
  }
</script>