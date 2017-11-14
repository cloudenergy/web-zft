<template>
    <app class="bills module">
        <top-nav :links="links"></top-nav>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </app>
</template>

<script>
<<<<<<< HEAD
    export default {
    	data() {
    		return {
    			links: [{ url: '/bills', text: '运营账单' }]
    		};
    	}
    };
=======
	export default {
		data() {
			return {
				links: [{ url: '/bills', text: '运营账单' }]
			};
		}
	};
>>>>>>> 3873eb3b054b29d666debb700241fca03d254495
</script>

<style>

</style>