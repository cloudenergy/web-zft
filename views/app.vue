<template>
  <div class="app">
      <div class="sider">
          <site-nav />
      </div>
      <div class="main">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
    export default {};
</script>


<style lang="less" scoped>
    @top-height: 60px;

    .app {
      position: relative;
      height: 100%;
    }

    .sider {
      padding-top: @top-height;
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
    }
</style>

