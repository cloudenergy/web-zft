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
    			links: [
                    { url: '/devices', text: '自动抄表' },
                    { url: '/devices/unitprice', text: '单价设置' },
                    { url: '/devices/equipment', text: '设备管理' },
                ]
    		};
    	}
    };
</script>

<style>

</style>