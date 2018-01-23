<template>
	<div class="top-nav">
		<div class="links" style="display:inline-block">
			<el-tabs v-model="type" @tab-click="change">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane v-for="(item,index) in stateTypes" :key="index" :label="item.label" :name="item.label" />
			</el-tabs>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				stateTypes:[
					{
						label:'在租'
					},
					{
						label:'逾期3'
					},
					{
						label:'待入2'
					},
				],
				type:'all'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			change() {
				
			}
		}
	};
</script>

<style lang="less" scoped>
	
</style>
