<template>
	<div class="expense-setting">
		<el-row>
			<el-col :span="3">
				<div class="section-label">收租时间</div>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">账单</span>
					<el-select v-model="expense.billPlan" class="bill-plan">
						<el-option v-for="item in availablePlans" :label="item.name" :value="item.id"
								   :key="item.id"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<el-select v-model="expense.offset" class="bill-plan-days">
						<el-option v-for="item in dateRange(expense.billPlan)" :label="item.label" :value="item.value"
								   :key="item.value"></el-option>
					</el-select>
					<span class="el-input-group__append">收租</span>
				</div>
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
		},
		methods: {
			dateRange(planId) {
				return _.range(1, 31).map(i => ({
					value: `${i}`,
					label: `${i}${this.unitOfDate(planId)}`
				}))
			},
			unitOfDate(planId) {
				const plan = _.find(this.availablePlans, p => p.id === planId);
				return _.get(plan, 'unit') || '天';
			}
		},
		data() {
			return {
				availablePlans: [
					{
						id: 1,
						name: '开始前提前',
						unit: '天'
					}, {
						id: 2,
						name: '开始后固定',
						unit: '号'
					}, {
						id: 3,
						name: '开始前固定',
						unit: '号'
					}, {
						id: 4,
						name: '开始前一个月固定',
						unit: '号'
					},
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.section-label {
		margin-top: 3px;
	}

	.select-with-label {
		display: inline-table;
		.el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.bill-plan-input {
			display: table-cell;
		}
		.bill-plan-days {
			width: 100%;
		}
	}
</style>
<style lang="less">
	.modal.add-contract .el-row {
		margin-top: 5px;
	}

	.select-with-label {
		.bill-plan .el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.bill-plan-days .el-input__inner {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;

		}
	}


</style>