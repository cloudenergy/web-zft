<template>
	<div class="house-contract">
		<el-row>
			<el-col :span="3">
				<div class="section-label">租期</div>
			</el-col>
			<el-col :span="10">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">范围</span>
					<div class="block lease-start-input">
						<el-date-picker
								v-model="contract.leaseStart"
								type="date"
								placeholder="起租时间"
								:picker-options="startOptions">
						</el-date-picker>
					</div>
				</div>
			</el-col>
			<el-col :span="10" class="lease-end-input">
				<el-date-picker
						v-model="contract.leaseEnd"
						type="date"
						placeholder="退租时间"
						:picker-options="endOptions">
				</el-date-picker>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="section-label">合同描述</div>
			</el-col>
			<el-col :span="9">
				<el-input placeholder="JG4133" v-model="contract.contractNumber">
					<template slot="prepend">合同编号</template>
				</el-input>
			</el-col>
			<el-col :span="9">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">签约日期</span>
					<div class="block lease-start-input">
						<el-date-picker
								v-model="contract.signUpDate"
								type="date"
								placeholder="选择日期">
						</el-date-picker>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			contract: {
				required: true
			}
		},
		methods: {
			startOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			},
			endOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				},
				shortcuts: [{
					text: '半年',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24 * 180);
						picker.$emit('pick', date);
					}
				}, {
					text: '一年',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
						picker.$emit('pick', date);
					}
				}, {
					text: '两年',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 2);
						picker.$emit('pick', date);
					}
				}, {
					text: '三年',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 3);
						picker.$emit('pick', date);
					}
				}]
			}
		}
	}
</script>

<style lang="less" scoped>

	.lease-end-input {
		margin-left: 10px;
	}

	.select-with-label {
		display: inline-table;
		.el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.section-label {
		margin-top: 3px;
	}
</style>
<style lang="less">
	.select-with-label {
		.inline-input .el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			border-left: none;
		}
	}
</style>