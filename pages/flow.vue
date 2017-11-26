<template>
    <div class="flow module">
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
    			links: [{ url: '/flow', text: '流水' }]
    		};
    	}
    };
</script>

<style>

</style>