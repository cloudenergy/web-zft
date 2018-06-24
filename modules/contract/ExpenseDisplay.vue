<template>
	<div class="expense-display wrapper">
		<el-row>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">{{expense.name}}</span>
					<el-select v-model="expense.pattern" class="prepend-label" @change="setWay">
						<el-option v-for="item in paymentMethods" :label="item.name" :value="item.key" :key="item.key"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<el-input-number :controls="false" placeholder="请输入金额，精确到分" :precision="2" :step="0.1" v-model="expense.rent">
					</el-input-number>
					<span class="el-input-group__append">{{unitOf(expense.pattern)}}</span>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import fp from 'lodash/fp';

	export default {
		props: {
			expense: {
				required: true
			},
			allowPayWithRent: {
				type: Boolean,
				default: true
			}

		},
		computed: {
			paymentMethods() {
				return this.allowPayWithRent ? fp.concat(this.payWithRent, this.standardMethods) : this.standardMethods
			}
		},
		mounted() {
		},
		data() {
			return {
				payway: '2',
				standardMethods: [{
					name: '一月一付',
					key: '1',
				}, {
					name: '两月一付',
					key: '2',
				}, {
					name: '三月一付',
					key: '3',
				}, {
					name: '半年一付',
					key: '6',
				}, {
					name: '一年一付',
					key: '12',
				}, {
					name: '一次付清',
					key: 'paidOff',
					unit: '元'
				}],
				payWithRent: [{
					name: '预付费',
					key: 'prepaid',
					unit: '元/天'
				}, {
					name: '随租金付',
					key: 'withRent',
				}]
			}
		},
		methods: {
			unitOf(pattern) {
				const method = fp.find(fp.pipe(fp.get('key'), fp.eq(pattern)))(this.paymentMethods);
				return fp.getOr('元/月')('unit')(method);
			},
			setWay(data) {

			},
			deductionDate(data) {
				if (data !== "1") {
				} else {
					this.expense.frequency = 'day'
				}

			}
		}
	}
</script>

<style lang="less" scoped>

	.el-input-number--mini {
		width: 173px;
	}

	.el-input-group__append {
		width: 69px;
	}
</style>
