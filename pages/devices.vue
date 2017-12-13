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
                    { url: '/devices', text: '仪表管理' },
                    { url: '/devices/unitprice', text: '单价设置' }    
                ]
    		};
    	}
    };
</script>

<style>

</style>