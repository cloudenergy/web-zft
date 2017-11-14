<template>
	<div class="top-nav">
		<div class="logo">
			<img src="static/imgs/logo.png">
		</div>
		<div class="links">
			<el-menu class="el-menu-demo" mode="horizontal" :router="true" :default-active="$route.path">
				<el-menu-item :index="link.url" v-for="link in links" :key="link.url">{{link.text}}</el-menu-item>
			</el-menu>
		</div>
	</div>
</template> 
<script>
	export default {
		props: {
			links: Array
		}
	};
</script>

<style lang="less" scoped>
	.top-nav {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: row;
		align-content: stretch;
		align-items: stretch;
		justify-content: space-between;
		height: 60px;
		color: #fff;
	}

	.logo {
		display: flex;
		flex: 0 1 auto;
		flex-direction: column;
		align-content: center;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100px;
		background-color: #3c4d68;
		img {
			max-width: 80%;
		}
	}

	.links {
		flex: 1 1 auto;
	}

	.ceiling-main {
		float: right;
		margin-right: 15px;

		a {
			color: #9ba7b5;
			margin: 0 10px;
		}
	}
</style>
