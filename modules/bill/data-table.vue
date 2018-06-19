<template>
  <div>
    <el-table :data="tableBill" style="width: 100%">
      <el-table-column type="index" width="50" label="序号" :index="indexMethod">
      </el-table-column>
      <el-table-column label="应支付日" width="200">
        <template slot-scope="scope">
          <p style="color:red" v-if="isOverdue(nowTime(), scope.row)">已逾期{{overdueDays(nowTime(),
            toDate(scope.row.dueDate))}}天</p>
          <p style="" class="gray">{{ scope.row.dueDateTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="住户姓名">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.user.name }}</span><i class="el-icon-phone"></i>
            <p class="gray">{{ scope.row.user.accountName }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="房源/账期">
        <template slot-scope="scope">
          <p>{{ scope.row.room.locationName }}{{ scope.row.room.building }}幢{{ scope.row.room.unit }}单元{{
            scope.row.room.roomNumber
            }}&nbsp;{{ scope.row.room.roomName }}</p>
          <p class="gray">{{scope.row.startDateTime}} 至 {{scope.row.endDateTime}}</p>
        </template>
      </el-table-column>
      <el-table-column label="金额(¥)/类型">
        <template slot-scope="scope">
          <p>{{ price(scope.row.dueAmount) }}元</p>
          <p v-for="item in type" :key="item.type" v-if="scope.row.type===item.type" class="gray">{{ item.text
            }}{{scope.row.index}}<span v-if="scope.row.type==='rent'">期</span></p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" style="width:70px"
                     @click.native="handleReceive(scope.$index, scope.row)" :disabled="scope.row.payments.length!==0">
            收款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total='pagingSize.count' @current-change="handleCurrentChange"
                   style="margin-top:5px;text-align:right"
                   :page-size='20'>
    </el-pagination>
    <el-dialog title="收款" :visible.sync="dialogVisible" width="40%" class="billCollection">
      <billCollection :data="tableData" :type="otherCost" ref="collect" @closeDialog='closeDialog()'/>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="collection()">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>


<script>
  import billCollection from './bill-collection.vue'
  import fp from 'lodash/fp'
  import differenceInDays from 'date-fns/difference_in_days'
  import endOfDay from 'date-fns/end_of_day'

  export default {
    props: {
      pagingSize: {
        type: Object
      },
      tableBill: {
        type: Array
      }
    },
    components: {
      billCollection
    },
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId
      }
    },
    mounted() {
      this.query()
    },
    data() {
      return {
        tableData: [],
        paging: null,
        dialogVisible: false,
        dialogTitle: 'Tips',
        index: 1,
        type: [{
          type: 'bond',
          text: '押金'
        },
          {
            type: 'deposit',
            text: '定金'
          },
          {
            type: 'rent',
            text: '租金'
          },
          {
            type: 'extra',
            text: '加收'
          },
          {
            type: 'bond-refund',
            text: '退押金'
          },
          {
            type: 'deposit-refund',
            text: '退定金'
          },
          {
            type: 'rent-refund',
            text: '退租金'
          },
          {
            type: 'extra-refund',
            text: '退加收'
          },
        ],
        otherCost: []
      };
    },
    methods: {
      nowTime() {
        return new Date();
      },
      indexMethod(data) {
        return (this.index - 1) * 20 + data + 1
      },
      isOverdue(now, bill) {
        return fp.isEmpty(bill.payments)
          && this.overdueDays(now, endOfDay(this.toDate(bill.dueDate))) > 0
      },
      price(data) {
        return (data / 100).toFixed(2)
      },
      handleReceive(index, data) {
        this.tableData = data
        this.tableData.billItems.map((ele, index) => {
          ele.dueDateTime = data.dueDateTime
          ele.endDateTime = data.endDateTime
        })
        this.dialogVisible = true
      },
      collection() {
        this.$refs.collect.payRent()
      },
      closeDialog() {
        this.$emit('refresh')
        this.dialogVisible = false;
      },
      query() {
        this.$store
          .dispatch('GET_OTHERCOST')
          .then(data => (this.otherCost = fp.filter(fp.get('enabled'))(data)));
      },
      overdueDays(now, dueDate) {
        return differenceInDays(now, dueDate)
      },
      handleCurrentChange(val) {
        this.index = val
        this.$emit('sizeIndex', val)
      },
      toDate(epoch) {
        return new Date(epoch * 1000)
      }
    }
  };
</script>
<style scoped>
  .table_collection2 {
    margin-top: 20px;
  }

  .input3 {
    margin-top: 20px;
  }

  .gray {
    color: #999
  }

</style>

<style lang="less">
  .billCollection .el-dialog__body {
    padding: 10px 20px;
  }
</style>
