<template>
	<div class="expense-setting">
		<el-row>
			<el-col :span="3">
				<div class="section-label">收租时间</div>
			</el-col>
			<el-col :span="9">
				<el-input placeholder="必填" v-model="expense.billPlan">
					<template slot="prepend">账单</template>
				</el-input>
			</el-col>
			<el-col :span="9">
				<el-input placeholder="5天" v-model="expense.offset">
					<template slot="append">收租</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="section-label">租金</div>
			</el-col>
			<el-col :span="21">
				<ExpenseDisplay :expense="expense.standard"></ExpenseDisplay>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="section-label">附加费用</div>
				<el-button size="mini">+添加</el-button>
			</el-col>
			<el-col :span="21">
				<ExpenseDisplay v-for="item in expense.extra" :expense="item" :key="item.id"></ExpenseDisplay>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="section-label">押金</div>
			</el-col>
			<el-col :span="9">
				<el-input placeholder="押金" v-model="expense.bond">
					<template slot="prepend">常规押金</template>
				</el-input>
			</el-col>

		</el-row>
	</div>
</template>

<script>
	import ExpenseDisplay from './expense-display'

	export default {
		props: {
			expense: {
				required: true
			}
		},
		components: {
			ExpenseDisplay
		}
	}
</script>

<style lang="less" scoped>
	.section-label {
		margin-top: 3px;
	}
</style>
<style lang="less">
	.modal.add-contract .el-row {
		margin-top: 5px;
	}
</style>