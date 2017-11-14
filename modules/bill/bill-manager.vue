<template>
	<el-select v-model="manager" size="mini" filterable placeholder="管理" class="select">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		</el-option>
	</el-select>
</template>
<script>
	export default {
		data() {
			return {
				options: [
					{
						value: 'laojiang',
						label: '老蒋'
					},
					{
						value: 'laowang',
						label: '老王'
					},
					{
						value: 'laozhang',
						label: '老张'
					}
				],
				manager: 'laojiang'
			};
		}
	};
</script>

<style lang="less" scoped>
	.select {
		margin-left: 10px;
		margin-top: 10px;
	}
</style>
