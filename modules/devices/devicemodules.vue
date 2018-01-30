<template>
	<el-menu class="el-menu-status rent-menu" mode="horizontal" :default-active="form[0].index" @select="handleSelect">
		<el-menu-item v-for="item in form" :key="item.index" :index="item.index">{{item.text}}</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		props: {
			form: {
				type: Array
			}
		},
		data() {
			return {};
		},
		methods: {
			handleSelect(key, keyPath) {
				this.$emit('showthat', key)
			}
		}
	};
</script>

<style lang="less" scoped>
	.rent-menu {
		display: inline-block;
		margin-right: 10px;
		li {
			height: 40px;
			line-height: 40px;
		}
	}
</style>