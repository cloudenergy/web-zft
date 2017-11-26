<template>
    <div class="settings module">
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
    			links: [{ url: '/settings', text: '设置' }]
    		};
    	}
    };
</script>

<style>

</style>