<template>
	<div class="top-nav">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-bottom:15px">
			<el-menu-item index="quantum">
				按时间
			</el-menu-item>
			<el-menu-item index="flowmounth">
				按月度
			</el-menu-item>
			<el-menu-item index="flowsubject">
				按科目
			</el-menu-item>
			<el-menu-item index="flowchnnel">
				按渠道
			</el-menu-item>
		</el-menu>

		<component :is="activeIndex">

		</component>
	</div>
</template>
<script>
	import {
		flowchnnel,
		flowmounth,
		flowsubject,
		quantum
	} from './index';
	export default {
		components: {
			flowchnnel,
			flowmounth,
			flowsubject,
			quantum,
		},
		data() {
			return {
				activeName: 'first',
				loading: false,
				activeIndex: 'quantum',
				flowMounth:'adsf'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.activeIndex = key
			}
		}
	}
</script>

<style lang="less" scoped>
	.top-nav {
		height: 100%;
	}
</style>