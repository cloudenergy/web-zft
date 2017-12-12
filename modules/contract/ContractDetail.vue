<template>
	<div class="house-contract">
		<el-row>
			<el-col :span="3">
				<div class="section-label">租期</div>
			</el-col>
			<el-col :span="10">
				<el-form-item
						prop="contract.leaseStart"
						:rules="[
      						{ required: true, message: '请输入租期开始时间', trigger: 'blur', type: 'date' }
    					]">
					<div class="select-with-label el-input-group">
						<span class="el-input-group__prepend">范围</span>
						<div class="block lease-start-input prepend-label">
							<el-date-picker v-model="contract.leaseStart" type="date" placeholder="起租时间">
							</el-date-picker>
						</div>
					</div>
				</el-form-item>
			</el-col>
			<el-col :span="10" class="lease-end-input">
				<el-form-item
						prop="contract.leaseEnd"
						:rules="[
      						{ required: true, message: '请输入租期结束时间', trigger: 'blur', type: 'date' }
    					]">
					<el-date-picker v-model="contract.leaseEnd" type="date" placeholder="退租时间"
									:picker-options="endOptions">
					</el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-form-item
					prop="contract.contractNumber">
				<el-col :span="3">
					<div class="section-label">合同描述</div>
				</el-col>
				<el-col :span="9">
					<el-input placeholder="选填" v-model="contract.contractNumber">
						<template slot="prepend">合同编号</template>
					</el-input>
				</el-col>
				<el-col :span="9">
					<el-form-item
							prop="contract.signUpDate"
							:rules="[
								{ required: true, message: '请输入签约时间', trigger: 'blur', type: 'date' }
    					]">
						<div class="select-with-label el-input-group">
							<span class="el-input-group__prepend">签约日期</span>
							<div class="block lease-start-input prepend-label">
								<el-date-picker v-model="contract.signUpDate" type="date" placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
					</el-form-item>
				</el-col>
			</el-form-item>
		</el-row>
	</div>
</template>

<script>
	import {addMonths, addYears} from 'date-fns';

	export default {
		props: {
			contract: {
				required: true
			}
		},
		computed: {
			sixMonthsLength() {
				return addMonths(this.contract.leaseStart, 6)
			},
			oneYearLength() {
				return addYears(this.contract.leaseStart, 1)
			},
			twoYearsLength() {
				return addYears(this.contract.leaseStart, 2)
			},
			threeYearsLength() {
				return addYears(this.contract.leaseStart, 3)
			}
		},
		data() {
			const vm = this;
			return {
				endOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now();
					},
					shortcuts: [
						{
							text: '半年',
							onClick(picker) {
								picker.$emit('pick', vm.sixMonthsLength);
							}
						},
						{
							text: '一年',
							onClick(picker) {
								picker.$emit('pick', vm.oneYearLength);
							}
						},
						{
							text: '两年',
							onClick(picker) {
								picker.$emit('pick', vm.twoYearsLength);
							}
						},
						{
							text: '三年',
							onClick(picker) {
								picker.$emit('pick', vm.threeYearsLength);
							}
						}
					]
				}
			};
		}
	};
</script>

<style lang="less" scoped>
	.lease-end-input {
		margin-left: 20px;
	}

	.select-with-label {
		display: inline-table;
		.el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
</style>