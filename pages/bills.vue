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
          links: [{ url: "/bills", text: "运营账单" }]
        };
      }
    };
</script>

<style>

</style>
