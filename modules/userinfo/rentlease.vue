<template>
  <el-table 
    :data="billItem" 
    stripe 
    :row-key="getRowKeys" 
    :expand-row-keys="expands"     
    @row-click='handleRowHandle'    
    ref="tableData"
    style="width:100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="hideMenu">
          <div style="vertical-align:top">
            账单明细
          </div>
          <div>
            <div v-for="item in props.row.billItems" :key="item.id" class="setinline">
              <div>{{item.configId}}</div>
             <div>{{item.amount}}</div>
             <div>{{item.createdAtTime}}</div>
             <div>{{item.id}}</div>
            </div>
          </div>
        </div>
        <div class="hideMenu">
          <div style="vertical-align:top">
            支付记录
          </div>
          <div>
            <div v-for="item in props.row.paymentHistory" :key="item.amount" class="setinline">
              <div>{{item.createdAt}}</div>
              <div>{{item.paymentChannel}}</div>
              <div>{{item.amount}}</div>
              <div>{{item.operator}}</div>
              <div>{{item.status}}</div>
            </div>
          </div>
          
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="80">
    </el-table-column>
    <el-table-column label="账期" width="240">
      <template slot-scope="scope">
        <span>{{scope.row.startDateNew}}</span>至
        <span>{{scope.row.endDateNew}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="dueAmount" label="金额" width="80">
    </el-table-column>
    <el-table-column prop="dueDateNew" label="时间">
    </el-table-column>
    <el-table-column prop="createdAtNew" label="状态" width="120">
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
    computed: {
      billItem: function(){
        return this.form.map(function(item){
          item.startDateNew = new Date(parseInt(item.startDate) * 1000).toLocaleDateString().replace(/年|月/g, '-')
          // console.log(item.startDate)
          item.endDateNew = new Date(parseInt(item.endDate) * 1000).toLocaleDateString().replace(/年|月/g, '-')
          item.dueDateNew = new Date(parseInt(item.dueDate) * 1000).toLocaleDateString().replace(/年|月/g, '-')
          item.createdAtNew = new Date(parseInt(item.createdAt) * 1000).toLocaleDateString().replace(/年|月/g, '-')
          item.billItems.map(function(newitem){
            newitem.createdAtTime=new Date(parseInt(newitem.createdAt) * 1000).toLocaleDateString().replace(/年|月/g, '-')
            return newitem
          })
          return item
        })
      }
    },
    data() {
      return {
        getRowKeys(row) {
                return row.id;
        },
        expands: []
      }
    },
    methods: {
      // 展开方法参考https://segmentfault.com/q/1010000007828282
      // quantumlist.vue里也有使用，也可以参考
      handleRowHandle(row) {              
        // console.log(row.id)
        this.toggle(row.id)
      },
      toggle(flowi) {
        this.$refs.tableData.toggleRowExpansion(this.form.find(d => d.id == flowi))
      },
      set(time){
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/\//g, "-")
      },
    }
  }
</script>

<style lang="less" scoped>
  .hideMenu:nth-child(1){
    border-bottom: 1px solid #aaa
  }
  .hideMenu>div{
    display: inline-block;
  }
  .hideMenu>div:nth-child(1){
    min-width: 80px;
  }
  .hideMenu>div:nth-child(2){
    border-left: 1px solid #aaa
  }
  .setinline>div{
    display: inline-block;
    padding: 0 10px;
    &:nth-child(1){
      width: 240px;
      
    }
    &:nth-child(2){
      width: 80px;
    }
  }
</style>