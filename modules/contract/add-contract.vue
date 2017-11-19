<template>
	<div class="modal add-contract">
		<el-form :model="form" class="v-form" label-width="100px">
			<h3>承租信息</h3>
			<UserProfile :profile="form.profile"></UserProfile>
			<HouseProfile :property="form.property"></HouseProfile>
			<ContractDetail :contract="form.contract"></ContractDetail>

			<h3>租费设置</h3>
			<el-row>
				<el-col :span="3">
					<div class="section-label">收租时间</div>
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
					<div class="section-label">租金</div>
				</el-col>
				<el-col :span="21">
					<ExpenseDisplay :expense="form.expense"></ExpenseDisplay>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3">
					<div class="section-label">附加费用</div>
					<el-button size="mini">+添加</el-button>
				</el-col>
				<el-col :span="21">
					<ExpenseDisplay v-for="item in form.extraExpense" :expense="item" :key="item.id"></ExpenseDisplay>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3">
					<div class="section-label">押金</div>
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
</template>

<script>
	import ExpenseDisplay from './expense-display'
	import UserProfile from './user-profile'
	import HouseProfile from './house-profile'
	import ContractDetail from './contract-detail'

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
						leaseStart: new Date().toISOString().slice(0, 10),
						leaseEnd: new Date("2018-11-11").toISOString().slice(0, 10),
						contractNumber: '',
						signUpDate: new Date().toISOString().slice(0, 10)
					},
					billPlan: '',
					offset: '',
					expense: {
						id: 1,
						name: '常规',
						type: '2',
						amount: 3600,
						paymentMethod: '一月一付',
					},
					rentPaymentMethod: '一月一付',
					extraExpense: [
						{
							id: 2,
							name: '电费',
							type: '2',
							amount: 1.20,
							paymentMethod: '预付费',
						},
						{
							id: 3,
							name: '水费',
							type: 'water',
							amount: 20,
							paymentMethod: '随租金付',
						}
					],
					bond: 2600
				}
			};
		},
		methods: {
			save(form) {
				//wait for close method
				console.log(form);
			}
		},
		components: {
			ExpenseDisplay,
			UserProfile,
			HouseProfile,
			ContractDetail
		}

	};

</script>

<style lang="less" scoped>
	.dialog-footer {
		text-align: right;
	}

	.section-label {
		margin-top: 3px;
	}
</style>
<style lang="less">
	.modal.add-contract .el-row {
		margin-top: 5px;
	}
</style>
