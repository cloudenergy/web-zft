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
    			links: [
                    { url: '/settings', text: '设置' },
                    { url: '/settings/setting/user', text: '帐号中心' },
                    { url: '/settings/setting/setup', text: '全局设置' },
                    { url: '/settings/setting/permit', text: '管家权限' },
                    { url: '/settings/setting/wallet', text: '我的钱包' },
                    { url: '/settings/setting/inteligentdevice', text: '智能硬件' },
                    { url: '/settings/setting/installment', text: '分期' },
                    ]
    		};
    	}
    };
</script>

<style>

</style>