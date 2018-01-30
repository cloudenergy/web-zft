<template>
	<el-select v-model="billType" size="mini" filterable placeholder="类型" class="select">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		</el-option>
	</el-select>
</template>
<script>
	export default {
		data() {
			return {
				options: [{
						value: 'all',
						label: '全部'
					},
					{
						value: 'prepaid',
						label: '租约'
					},
					{
						value: 'postpaid',
						label: '记账'
					}
				],
				billType: 'all'
			};
		}
	};
</script>

<style lang="less" scoped>
	.select {
		margin-left: 10px; // margin-top: 10px;
	}
</style>