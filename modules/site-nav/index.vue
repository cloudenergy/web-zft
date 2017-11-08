<template>
  <div class="nav">
      <el-menu default-active="1-4-1" class="el-menu-vertical" :collapse="true">
        <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">房源</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">租务</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">账单</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {};
</script>

<style lang="less" scoped>
    .nav {
      position: absolute;
      top: 60px;
      bottom: 0px;
      left: 0px;
    }

    .el-menu-vertical {
      height: 100%;
    }
</style>
