<template>
	<div class="expense-display wrapper">
		<el-row>
			<el-col :span="12">
				<el-input placeholder="" v-model="expense.amount">
					<template slot="prepend">{{expense.name}}</template>
				</el-input>
			</el-col>
			<el-col :span="12">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">方式</span>
					<el-select v-model="expense.paymentMethod" class="house-type">
						<el-option v-for="item in paymentMethods" :label="item.name" :value="item.id" :key="item.id"></el-option>
					</el-select>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			expense: {
				required: true
			}
		},
		data() {
			return {
				paymentMethods: [{
					id: 1,
					name: '预付费'
				}, {
					id: 2,
					name: '一月一付'
				}, {
					id: 3,
					name: '两月一付'
				}, {
					id: 4,
					name: '三月一付'
				}, {
					id: 5,
					name: '半年一付'
				}, {
					id: 6,
					name: '一年一付'
				}, {
					id: 7,
					name: '一次付清'
				}]
			}
		}
	}
</script>

<style lang="less" scoped>
	.select-with-label {
		width: 100%;
	}
</style>