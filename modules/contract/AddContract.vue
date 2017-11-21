<template>
	<div class="modal add-contract">
		<el-form :model="form" class="v-form" label-width="100px">
			<h3>承租信息</h3>
			<UserProfile :profile="form.profile"></UserProfile>
			<HouseProfile :property="form.property"></HouseProfile>
			<ContractDetail :contract="form.contract"></ContractDetail>

			<h3>租费设置</h3>
			<ExpenseSetting :expense="form.expense"></ExpenseSetting>

		</el-form>
		<div class="dialog-footer">
			<el-button @click="close()">取 消</el-button>
			<el-button type="primary" @click="save(form)">创建租户</el-button>
		</div>
	</div>
</template>

<script>
	import UserProfile from './UserProfile.vue'
	import HouseProfile from './HouseProfile.vue'
	import ContractDetail from './ContractDetail.vue'
	import ExpenseSetting from './ExpenseSetting.vue'

	import moment from 'moment'

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
						idType: 1
					},
					property: {
						houseType: '1',
						house: '',

					},
					contract: {
						leaseStart: moment().format('YYYY-MM-DD'),
						leaseEnd: moment().add(3, 'months').format('YYYY-MM-DD'),
						contractNumber: '',
						signUpDate: moment().format('YYYY-MM-DD')
					},
					expense: {
						billPlan: 1,
						offset: '',
						standard: {
							id: 1,
							name: '常规租金',
							type: '2',
							amount: 3600,
							paymentMethod: '一月一付',
						},
						extra: [
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
			UserProfile,
			HouseProfile,
			ContractDetail,
			ExpenseSetting
		}

	};

</script>

<style lang="less" scoped>
	.dialog-footer {
		text-align: right;
	}
</style>
