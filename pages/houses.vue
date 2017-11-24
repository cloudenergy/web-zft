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
    				{ url: '/houses', text: '出租管理' },
    				{ url: '/houses/contract', text: '编辑管理' }
    			]
    		};
    	}
    };
</script>

<style>

</style>