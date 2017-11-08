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
    .app {
      position: relative;
      height: 100%;
    }

    .top-nav {
      width: 100%;
      height: 60px;
    }
</style>

