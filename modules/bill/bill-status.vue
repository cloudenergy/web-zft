<template>
	<el-tabs v-model="type" @tab-click="change">
		<el-tab-pane label="未完成" name="false"></el-tab-pane>
		<el-tab-pane label="已完成" name="true"></el-tab-pane>
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				type: 'false'
			};
		},
		methods: {
			change(key, keyPath) {
				this.$emit('billStatus', key.name)
			}
		}
	};
</script>

<style lang="less" scoped>
	.bill-menu {
		width: 164px;
	}

	.bill-menu>li {
		height: 40px;
		line-height: 40px;
	}
</style>