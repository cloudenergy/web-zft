<template>
  <div>
<div style="position:relative;display:inline-block;" class="settimeEnd">
            <span class="marsp">范围</span>
            <el-date-picker
              v-model="value3"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:200px;padding:3px;over-flow:hidden"
              class="datach"
              @change="oldTime(value3)">
            </el-date-picker>
            <span style="position: absolute;" class="shabi">至</span>
          </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
            value3: [new Date(), new Date()],
        }
    },
    methods: {
        oldTime(data){
            console.log(data)
        }
    }
}
</script>

<style lang="less" scoped>
    .shabi{
    left: 128px;
    top: 6px;
    display: inline-block;
    line-height: 18px;
    background-color: #fff;
    }
   .marsp{
       margin-right: 5px;
    }
</style>

<style>
    .settimeEnd>div>span.el-range-separator{
        min-width: 0;
    }
</style>

