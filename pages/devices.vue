<template>
    <div class="devices module">
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
    			links: [{ url: '/devices', text: '设备' }]
    		};
    	}
    };
</script>

<style>

</style>