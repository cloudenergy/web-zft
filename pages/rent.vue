<template>
  <div class="houses">
      <top-nav :links="links"></top-nav>
      <router-view></router-view>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          links: [{ url: "/rent", text: "出租管理" }]
        };
      }
    };
</script>

<style>

</style>
