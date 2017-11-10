<template>
    <app>
        <div class="houses module">
            <top-nav :links="links"></top-nav>
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </app>
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
