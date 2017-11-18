<template>
	<el-dialog title="添加租户" :visible="true">
		<div class="modal add-contract">
			<el-form :model="form" class="v-form" label-width="100px">
				<div>承租信息</div>
					<el-row>

						<el-col :span="8">
							<el-input placeholder="必填" v-model="form.profile.name">
								<template slot="prepend">姓名</template>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="必填(建议手机号)" v-model="form.profile.account">
								<template slot="prepend">账号</template>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="选填" v-model="form.profile.phone">
								<template slot="prepend">电话</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-input placeholder="男" v-model="form.profile.gender">
								<template slot="prepend">性别</template>
							</el-input>
						</el-col>
						<el-col :span="5">
							<el-select v-model="form.profile.idType" class="id-type">
								<el-option label="身份证" value="1"></el-option>
								<el-option label="护照" value="2"></el-option>
								<el-option label="港澳通行证" value="3"></el-option>
								<el-option label="台胞证" value="4"></el-option>
								<el-option label="居住证" value="5"></el-option>
								<el-option label="临时居住证" value="6"></el-option>
								<el-option label="营业执照" value="7"></el-option>
								<el-option label="其他证件" value="8"></el-option>
							</el-select>
						</el-col>
						<el-col :span="11">
							<el-input placeholder="证件号(选填)" v-model="form.profile.idNumber">
							</el-input>
						</el-col>
					</el-row>

					<div class="select-with-label el-input-group"><span class="el-input-group__prepend">承租房源</span>
						<el-select v-model="form.property.houseType" class="house-type">
							<el-option label="全部" value="1"></el-option>
							<el-option label="整租" value="2"></el-option>
							<el-option label="合租" value="3"></el-option>
							<el-option label="独栋" value="4"></el-option>
						</el-select>
						<el-autocomplete
								class="inline-input"
								v-model="form.property.house"
								:fetch-suggestions="querySearch"
								placeholder="搜索房源编号、小区名称等关键字"
								:trigger-on-focus="false"
								@select="handleSelect">
						</el-autocomplete>
					</div>

					<div>租期</div>
						<el-row>
							<el-col :span="3">
								<div class="range-label">范围</div>
							</el-col>
							<el-col :span="9">
								<div class="block">
									<el-date-picker
											v-model="form.contract.leaseStart"
											type="date"
											placeholder="起租时间"
											:picker-options="startOptions">
										<!--<template slot="prepend">范围</template>-->
									</el-date-picker>
								</div>
							</el-col>
							<el-col :span="9" class="lease-end-input">
								<el-date-picker
										v-model="form.contract.leaseEnd"
										type="date"
										placeholder="退租时间"
										:picker-options="endOptions">
								</el-date-picker>
							</el-col>
						</el-row>
					<el-row>
						<el-col :span="3">
							<template>合同描述</template>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="JG4133" v-model="form.contract.contractNumber">
								<template slot="prepend">合同编号</template>
							</el-input>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="2017-09-01" v-model="form.contract.signUpDate">
								<template slot="prepend">签约日期</template>
							</el-input>
						</el-col>
					</el-row>

				<div>租费设置</div>
					<el-row>
						<el-col :span="3">
							<template>收租时间</template>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="必填" v-model="form.billPlan">
								<template slot="prepend">账单</template>
							</el-input>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="5天" v-model="form.offset">
								<template slot="append">收租</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3">
							<template>租金</template>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="3600月" v-model="form.rent">
								<template slot="prepend">常规租金</template>
							</el-input>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="一月一付" v-model="form.rentPaymentMethod">
								<template slot="prepend">方式</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3">
							<template>附加费用</template>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="3600月" v-model="form.bill.electricity.amount">
								<template slot="prepend">电费</template>
							</el-input>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="预付费" v-model="form.bill.electricity.paymentMethod">
								<template slot="prepend">方式</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :offset="3" :span="9">
							<el-input placeholder="1.2度" v-model="form.bill.water.amount">
								<template slot="prepend">水费</template>
							</el-input>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="随租金付" v-model="form.bill.water.paymentMethod">
								<template slot="prepend">方式</template>
							</el-input>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="3">
							<template>押金</template>
						</el-col>
						<el-col :span="9">
							<el-input placeholder="3600" v-model="form.bond">
								<template slot="prepend">常规押金</template>
							</el-input>
						</el-col>

					</el-row>
			</el-form>
			<div class="dialog-footer">
				<el-button @click="close()">取 消</el-button>
				<el-button type="primary" @click="save(form)">创建租户</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import Modal from '~/plugins/modal';

	export default {
		data() {
			return {
				form: {
					profile: {
						name: '',
						account: '',
						phone: '',
						gender: '',
						idNumber: '',
						idType: '1'
					},
					property: {
						houseType: '1',
						house: '',

					},
					contract: {
						leaseStart: '',
						leaseEnd: '',
						contractNumber: '',
						signUpDate: ''
					},
					billPlan: '',
					offset: '',
					rent: '',
					rentPaymentMethod: '',
					bill: {
						electricity: {
							amount: 3600,
							paymentMethod: '',
						},
						water: {
							amount: 10,
							paymentMethod: '',
						}
					},
					bond: 2600
				},
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
			};
		},
		methods: {
			handleSelect(item) {
				console.log(item);
				return {};
			},
			querySearch(queryString, cb) {
				cb([]);
			},
			save(form) {
				this.close()
			}
		}
	};
</script>

<style lang="less" scoped>
	.dialog-footer {
		text-align: right;
	}

	.house-type {
		display: block;
	}

	.inline-input {
		width: 70%;
	}

	.house-input {
		width: 0;
	}

	.lease-end-input {
		margin-left: 10px;
	}

	.select-with-label {
		display: inline-table;
		.el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.inline-input {
			display: table-cell;
			.el-input__inner {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
	}


</style>
<style lang="less">
	.select-with-label {
		.house-type .el-input__inner {
			border-radius: 0;

		}
		.inline-input .el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			border-left: none;
		}
	}
	.modal.add-contract .el-form-item {

	}
</style>
