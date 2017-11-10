<template>
  <div class="app">
    <div class="sider">
        <site-nav />
    </div>
    <div class="main">
        <slot />
    </div>
</div>
</template>
<script>
    export default {
      name: "app"
    };
</script>

<style lang="less">
    @top-height: 60px;

    .app > .sider {
      padding-top: @top-height;
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      z-index: 2;
    }
</style>

<style lang="less" scoped>
    .app,
    .main {
      position: relative;
      height: 100%;
    }
</style>

