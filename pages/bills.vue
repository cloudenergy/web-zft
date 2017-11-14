<template>
	<app class="bills module">
		<top-nav :links="links"></top-nav>
		<div class="main-content">
			<router-view></router-view>
		</div>
	</app>
</template>

<script>
	export default {
		data() {
			return {
				links: [{ url: '/bills', text: '运营账单' }]
			};
		}
	};
</script>

<style>

</style>