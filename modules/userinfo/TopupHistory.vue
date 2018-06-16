<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column label="日期" width="150">
      <template slot-scope="scope">
        {{dateTime(scope.row.time)}}
      </template>
    </el-table-column>
    <el-table-column label="充值金额" color="green">
      <template slot-scope="scope">
        {{price(scope.row.amount)}}
      </template>
    </el-table-column>
    <el-table-column label="手续费" color="green">
      <template slot-scope="scope">
        {{price(scope.row.fee)}}
      </template>
    </el-table-column>
    <el-table-column label="账户余额" color="green">
      <template slot-scope="scope">
        <span :class="colorOf(scope.row.balance)">{{price(scope.row.balance)}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="fundChannelName" label="支付方式">
    </el-table-column>
    <el-table-column prop="operator" label="经办人">
    </el-table-column>
  </el-table>
</template>

<script>
  import {format} from 'date-fns';

  export default {
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId
      }
    },
    props: {
      form: {
        required: true
      }
    },
    mounted() {
      this.query();
    },
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.query()
    },
    methods: {
      colorOf(balance) {
        return balance < 0 ? 'red' : 'black';
      },
      refresh() {
        this.$set(this, 'tableData', []);
        this.query();
      },
      dateTime(data) {
        return format(parseInt(data) * 1000, 'YYYY-MM-DD HH:mm:ss')
      },
      price(data) {
        return (data / 100).toFixed(2)
      },
      query() {
        this.$model('paid_bills')
          .query({
            mode: 'topup',
            index: 1,
            size: 15
          }, {
            projectId: this.projectId,
            contractId: this.form.id
          })
          .then(res => {
            this.$set(this, 'tableData', res.data || []);
          })
      }
    },
    watch: {
      form(newVal, oldVal) {
        if (newVal.id !== oldVal.id) {
          this.refresh();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .red {
    color: #F03D53;
  }

  .black {
    color: #303133;
  }
</style>
