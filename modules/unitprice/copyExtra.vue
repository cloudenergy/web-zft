<template>
  <div class="unitPrice">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkList">
      <el-row>
        <el-col :span="8" v-for="(item,index) in data" :key="index" :class="{rightBorder:(index+1)%3!==0}"
                class="copyExtra">
          <div class="full">
            <el-checkbox :label="item.houseId" text-color="#000000" class="full">
              <div class="full">
                <el-row>
                  <el-col :span="20">{{item.location.name}} {{item.building}}幢{{item.unit}}单元{{item.roomNumber}}{{nameOf(item)}}</el-col>
                  <el-col :span="4">{{price(item.electricity[0].price)}}元</el-col>
                </el-row>
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
  import fp from 'lodash/fp'
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
      nameOf(room) {
        return fp.isEmpty(room.name) ? (this.houseFormat === 'SHARE' ? '公区' : '') : room.name;
      }
    }
  }
</script>

<style lang="less" scoped>
  .unitPrice {
    background-color: #fff;
    padding: 20px;
    .copyExtra {
      height: 40px;
      display: flex;
      align-items: center;
    }
    .dialog-footer {
      text-align: right;
      display: block;
    }
  }
  .full {
    width: 100%;
    min-width: 350px;
  }


</style>
<style>
  .unitPrice .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333
  }
</style>
