<template>
	<div class="top-nav">
		<div class="links" style="display:inline-block">
			<el-menu class="el-menu-status rent-menu" mode="horizontal" default-active="rent-all" @select="handleSelect">
				<el-menu-item index="rent-all">全部</el-menu-item>
				<el-menu-item index="rent-lessee">再租17</el-menu-item>
				<el-menu-item index="rent-overdue">逾期3</el-menu-item>
				<el-menu-item index="rent-wait">待入2</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	};
</script>

<style lang="less" scoped>
	.rent-menu>li{
		height:40px;
		line-height:40px;
	}
</style>
