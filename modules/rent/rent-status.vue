<template>
	<div class="top-nav">
		<div class="links" style="display:inline-block">
			<el-tabs v-model="type" @tab-click="change">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane v-for="(item,index) in stateTypes" :key="index" :label="item.label" :name="item.value" />
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
						label:'在租',
						value:'leasing'
					},
					{
						label:'逾期',
						value:'overdue'
					},
					{
						label:'待入',
						value:'waiting'
					},
				],
				type:'all'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			change(tab, event) {
				this.$emit('leasingStatus',tab.name)
			}
		}
	};
</script>

<style lang="less" scoped>
	
</style>
