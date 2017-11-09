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
          links: [{ url: "/houses/rent", text: "房源管理" }]
        };
      }
    };
</script>

<style>

</style>
