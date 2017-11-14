<template>
	<app>
		<div class="houses module">
			<top-nav :links="links"></top-nav>
			<div class="main-content">
				<router-view></router-view>
			</div>
		</div>
	</app>
</template>

<script>
<<<<<<< HEAD
    export default {
    	data() {
    		return {
    			links: [
    				{ url: '/houses', text: '房源管理' },
    				{ url: '/houses/rent', text: '出租管理' }
    			]
    		};
    	},
    	created() {
    		this.$model('home').then(data => console.log('houses: ', data));
    	}
    };
=======
	export default {
		data() {
			return {
				links: [
					{ url: '/houses', text: '房源管理' },
					{ url: '/houses/rent', text: '出租管理' }
				]
			};
		},
		created() {
			this.$model('home').then(data => console.log('houses: ', data));
		}
	};
>>>>>>> 3873eb3b054b29d666debb700241fca03d254495
</script>

<style>

</style>