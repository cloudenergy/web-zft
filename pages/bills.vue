<template>
    <app class="bills module">
        <top-nav :links="links"></top-nav>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </app>
</template>

<script>
    export default {
        data() {
            return {
                links: [{url: "/bills/ops", text: "运营账单"},
                    {url: "/bills/other", text: "其他账单"}]
            };
        }
    };
</script>

<style>

</style>
