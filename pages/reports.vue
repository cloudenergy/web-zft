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
    			links: [
                    { url: '/reports', text: '营业总表' },
                    { url: '/reports/reports/profits', text: '利润报表' },
                    { url: '/reports/reports/rent', text: '合同报表' },
                    { url: '/reports/reports/bills', text: '账单报表' },
                    ]
    		};
    	}
    };
</script>

<style>

</style>