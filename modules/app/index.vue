<template>
	<div class="app">
		<div class="sider">
			<site-nav />
		</div>
		<div class="main">
			<slot />
		</div>
		<app-modal ref="modal"></app-modal>
		<div class="userInfo flexc">
			<el-dropdown placement="bottom">
				<span class="el-dropdown-link">
					username
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	import site_nav from './site-nav';

	export default {
		name: 'app',
		components: {
			'site-nav': site_nav
		}
	};
</script>

<style lang="less">
	@top-height: 60px;

	.app {
		display: flex;
	}

	.main {
		overflow-y: scroll;
	}

	.app,
	.main {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.app>.sider {
		z-index: 2;
		width: 120px;
		background-color: #2f3c4d;
		flex: 0 0 256px;
		max-width: 256px;
		min-width: 256px;
		width: 256px;
	}

	.app .userInfo {
		position: absolute;
		top:20px;
		right: 20px;
		z-index: 4;
	}
</style>

<style lang="less" scoped>
</style>