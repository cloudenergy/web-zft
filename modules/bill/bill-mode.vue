<template>
	<el-select v-model="billMode" size="mini" filterable placeholder="方式" class="select">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		</el-option>
	</el-select>
</template>
<script>
	export default {
		name: 'bill-mode',
		data() {
			return {
				options: [{
						value: 'all',
						label: '全部'
					},
					{
						value: 'collection',
						label: '收款'
					},
					{
						value: 'payment',
						label: '付款'
					}
				],
				billMode: 'all'
			};
		}
	};
</script>
