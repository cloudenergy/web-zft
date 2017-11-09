<template>
  <div class="app">
      <top-nav class="top-nav" />
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
    @top-height: 30px;

    .app {
      position: relative;
      height: 100%;
    }

    .sider {
      position: absolute;
      top: @top-height;
      bottom: 0px;
      left: 0px;
    }

    .top-nav {
      width: 100%;
      height: @top-height;
    }
</style>

