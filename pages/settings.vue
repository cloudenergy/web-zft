<template>
    <div class="settings module" style="height:100%">
        <top-nav :links="links"></top-nav>
        <div class="main-content" style="height:100%">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			links: [
                    { url: '/settings', text: '设置' },
                    { url: '/settings/setting/setup', text: '全局设置' },
                    { url: '/settings/setting/permit', text: '管家权限' },
                    { url: '/settings/setting/wallet', text: '我的钱包' }
                    ]
    		};
    	}
    };
</script>

<style>

</style>