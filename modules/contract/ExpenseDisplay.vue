<template>
	<div class="expense-display wrapper">
		<el-row>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">{{expense.name}}</span>
					<el-select v-model="expense.pattern" class="prepend-label" @change="setWay">
						<el-option v-for="item in paymentMethods" :label="item.name" :value="item.key"
							   :key="item.key"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<el-input placeholder=""
						v-model="expense.rent"
						prefix-icon="el-icon-rank">
					</el-input>
					<span class="el-input-group__append" v-if="expense.pattern!=='prepaid'">元/月</span>
					<span class="el-input-group__append" v-if="expense.pattern==='prepaid'">
						<el-select v-model="payway" placeholder="请选择" style="width:69px" @change="deductionDate">
							<el-option
								v-for="item in payWay"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</span>
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
		mounted() {
			while(this.expense.name==='电费'){
				this.payWay[1].label='元/度'
				break
			}
		},
		data() {
			return {
				payway:'2',
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
				}],
				payWay:[
					{
						label:'元/天',
						value:'1'
					},
					{
						label:'元/m³',
						value:'2'
					}
				]
			}
		},
		methods: {
			setWay(data){
				if(data==='prepaid'){

				}
			},
			deductionDate(data){
				console.log(data)
				if(data!=="1"){
					console.log(1)
				}else{
					this.expense.frequency='day'
				}

			}
		}
	}
</script>
