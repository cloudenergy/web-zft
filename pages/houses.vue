<template>
    <div class="houses module">
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
    				{ url: '/houses', text: '房源管理' }
    			]
    		};
    	}
    };
</script>

<style>

</style>