<template>
	<div class="expense-setting">
		<el-row>
			<el-col :span="3">
				<div class="section-label">收租时间</div>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">账单</span>
					<el-select v-model="expense.billPlan" class="bill-plan prepend-label">
						<el-option v-for="item in availablePlans" :label="item.name" :value="item.plan"
								   :key="item.plan"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<el-select v-model="expense.offset" class="bill-plan-days">
						<el-option v-for="item in dateRange" :label="item.label" :value="item.value"
								   :key="item.value"></el-option>
					</el-select>
					<span class="el-input-group__append">收租</span>
				</div>
			</el-col>
		</el-row>
		<el-row class="standard-rent-row">
			<el-col :span="3">
				<div class="section-label">租金</div>
			</el-col>
			<el-col :span="21">
				<ExpenseDisplay :expense="expense.standard" :allowPayWithRent="false"></ExpenseDisplay>
			</el-col>
		</el-row>
		<el-row class="extra-rent-row">
			<el-col :span="3">
				<div class="section-label">附加费用</div>
				<el-button size="mini" @click="innerVisible = true">+添加</el-button>
			</el-col>
			<el-col :span="21" class="extra-item">
				<ExpenseDisplay v-for="item in expense.extra" :expense="item" :key="item.id"></ExpenseDisplay>
			</el-col>
		</el-row>
		<el-row class="bond-row">
			<el-col :span="3">
				<div class="section-label">押金</div>
			</el-col>
			<el-col :span="9">
				<el-input placeholder="押金" v-model="expense.bond">
					<template slot="prepend">常规押金</template>
				</el-input>
			</el-col>
		</el-row>
		<el-dialog
			width="30%"
			title="选择要增加的收费选项"
			:visible.sync="innerVisible"
			append-to-body>
			<el-checkbox v-model="otherCoste" :label="item.id" border v-for="item in otherCost" :key="item.id" @change="showother" style="width:85px;margin:3px">{{item.key}}</el-checkbox>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="chooseCost">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import ExpenseDisplay from './ExpenseDisplay'
	import _ from 'lodash'

	export default {
		props: {
			expense: {
				required: true
			},
			otherCost: {
				required: true
			}
		},
		components: {
			ExpenseDisplay
		},
		computed: {
			dateRange() {
				const rangeStart = _.get(this.currentPlan, 'min', 0);
				const rangeEnd = _.get(this.currentPlan, 'max', 31);
				return _.range(rangeStart, rangeEnd).map(i => ({
					value: _.padStart(i, 2, '0'),
					label: `${i}${this.unitOfDate}`
				}))
			},
			unitOfDate() {
				return _.get(this.currentPlan, 'unit') || '天';
			},
			currentPlan() {
				return _.find(this.availablePlans, p => p.plan === this.expense.billPlan);
			}
		},
		data() {
			return {
				outerVisible: false,
				innerVisible: false,
				otherCoste:[
					1041,1043
				],
				// (开始前提前-02/开始后固定+02/开始前固定F02/开始前一个月固定M02)
				availablePlans: [
					{
						name: '开始前提前',
						unit: '天',
						plan: '-',
						min: 0,
						max: 31
					}, {
						name: '开始后固定',
						unit: '号',
						plan: '+',
						min: 1,
						max: 31
					}, {
						name: '开始前固定',
						unit: '号',
						plan: 'F',
						min: 1,
						max: 31
					}, {
						name: '开始前一个月固定',
						unit: '号',
						plan: 'M',
						min: 1,
						max: 30
					},
				]
			}
		},
		methods: {
			addCost(data){
				
			},
			showother(){
				console.log(this.otherCoste)
			},
			chooseCost(){
				this.otherCoste.map((item,index)=>{
					return this.addCost(item)
				})
				this.innerVisible = false;
			}
		}
	}
</script>

<style lang="less" scoped>
	.section-label {
		margin-top: 4px;
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

	.bond-row,
	.standard-rent-row,
	.extra-rent-row {
		margin-top: 18px;
	}
</style>

<style lang="less">
	.bill-plan-days .el-input__inner {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.extra-rent-row .el-row {
		margin-bottom: 18px;
	 }
</style>