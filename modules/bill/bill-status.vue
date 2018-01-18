<template>
<el-col :span="4">
			<el-menu class="el-menu-status bill-menu" mode="horizontal" default-active="false" @select="handleSelect">
				<el-menu-item index="false">未完成</el-menu-item>
				<el-menu-item index="true">已完成</el-menu-item>
			</el-menu>

	<!-- <div class="top-nav">
		<div class="links">
			<el-menu class="el-menu-status bill-menu" mode="horizontal" default-active="progressing" @select="handleSelect">
				<el-menu-item index="progressing">未完成</el-menu-item>
				<el-menu-item index="finished">已完成</el-menu-item>
			</el-menu>
		</div>
	</div> -->
	</el-col>
</template>
<script>
	export default {
		data() {
			return {};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key);
				this.$emit('billStatus',key)
			}
		}
	};
</script>

<style lang="less" scoped>
	.bill-menu{
		width: 164px;
	}
	.bill-menu>li{
		height:40px;
		line-height:40px;
	}
</style>
