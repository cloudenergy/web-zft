<template>
	<div class="expense-display wrapper">
		<el-row>
			<el-col :span="12">
				<el-input placeholder=""
						  v-model="expense.amount"
						  prefix-icon="el-icon-rank">
					<template slot="prepend">{{expense.name}}</template>
				</el-input>
			</el-col>
			<el-col :span="12">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">方式</span>
					<el-select v-model="expense.paymentMethod" class="prepend-label">
						<el-option v-for="item in paymentMethods" :label="item.name" :value="item.key"
								   :key="item.key"></el-option>
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
					name: '预付费',
					key: 'prepaid'
				}, {
					name: '一月一付',
					key: 'perMonth'
				}, {
					name: '两月一付',
					key: 'twoMonth'
				}, {
					name: '三月一付',
					key: 'threeMonth'
				}, {
					name: '半年一付',
					key: 'sixMonth'
				}, {
					name: '一年一付',
					key: 'perYear'
				}, {
					name: '一次付清',
					key: 'once'
				}]
			}
		}
	}
</script>
