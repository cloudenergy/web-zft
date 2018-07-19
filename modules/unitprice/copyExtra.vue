<template>
  <div class="unitPrice">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkList">
      <el-row>
        <el-col :span="8" v-for="(item,index) in data" :key="index" :class="{rightBorder:(index+1)%3!==0}"
                class="copyExtra">
          <div class="">
            <el-checkbox :label="item.houseId" text-color="#000000">
              <div>
                <span>{{item.location.name}}</span>
                <span>{{item.building}}幢</span>
                <span>{{item.unit}}单元</span>
                <span>{{item.roomNumber}} </span>
                <span v-if="houseFormat==='SHARE'&&item.name===undefined">公区</span>
                <span v-if="houseFormat==='SHARE'&&item.name!==undefined">{{item.name}}</span>
                <p>当前电价：{{price(item.electricity[0].price)}}</p>
              </div>
            </el-checkbox>
          </div>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="costCopy(checkList)">确 定</el-button>
            <el-button @click="costCopy()">取 消</el-button>
        </span>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        required: true
      },
      houseFormat: {
        required: true
      }
    },
    computed: {
      houseOption() {
        return this.data.map(ele => {
          return ele.houseId
        })
      }
    },
    data() {
      return {
        selectAttribute: null,
        checkList: [],
        isIndeterminate: false,
        checkAll: false,
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkList = val ? this.houseOption : []
      },
      costCopy(data) {
        this.$emit('refresh', data)
      },
      price(data) {
        if (isNaN(data)) {
          return '未设置'
        } else {
          return (data / 100).toFixed(2)
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .unitPrice {
    background-color: #fff;
    padding: 20px;
    .copyExtra {
      height: 80px;
      display: flex;
      align-items: center;
    }
    .dialog-footer {
      text-align: right;
      display: block;
    }
  }


</style>
<style>
  .unitPrice .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333
  }
</style>
