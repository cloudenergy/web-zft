<template>
    <div class="reports module">
        <top-nav :links="links"></top-nav>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			links: [{ url: '/reports', text: '报表' }]
    		};
    	}
    };
</script>

<style>

</style>