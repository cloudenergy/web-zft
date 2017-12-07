<template>
	<div class="expense-display wrapper">
		<el-row>
			<el-col :span="12">
				<el-input placeholder=""
						  v-model="expense.rent"
						  prefix-icon="el-icon-rank">
					<template slot="prepend">{{expense.name}}</template>
				</el-input>
			</el-col>
			<el-col :span="12">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">方式</span>
					<el-select v-model="expense.pattern" class="prepend-label">
						<el-option v-for="item in paymentMethods" :label="item.name" :value="item.key"
								   :key="item.key"></el-option>
					</el-select>
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
				return this.allowPayWithRent ? fp.concat(this.standardMethods, this.payWithRent) : this.standardMethods
			}
		},
		data() {
			return {
				standardMethods: [{
					name: '一月一付',
					key: '1'
				}, {
					name: '两月一付',
					key: '2'
				}, {
					name: '三月一付',
					key: '3'
				}, {
					name: '半年一付',
					key: '6'
				}, {
					name: '一年一付',
					key: '12'
				}, {
					name: '一次付清',
					key: 'paidOff'
				}],
				payWithRent: [{
					name: '预付费',
					key: 'prepaid'
				}, {
					name: '随租金付',
					key: 'withRent'
				}]
			}
		}
	}
</script>
