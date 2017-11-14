<template>
	<app>
		<div class="rent module">
			<top-nav :links="links"></top-nav>
			<div class="main-content">
				<router-view></router-view>
			</div>
		</div>
	</app>
</template>

<script>
	export default {
		data() {
			return {
				links: [{ url: '/rent', text: '出租管理' }]
			};
		}
	};
</script>

<style>

</style>
