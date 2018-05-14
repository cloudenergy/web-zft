<template>
	<div class="modal add-contract" v-on:useralldata="onselect" v-loading="loading">
		<el-form :model="form" ref="form" class="v-form">
			<h3>续租</h3>
			<UserProfile :user="form.user" v-if="showUser"></UserProfile>
			<div style="height:74px" v-if="!showUser"></div>
			<HouseProfile :property="form.property"></HouseProfile>
			<Contract :contract="form.contract"></Contract>

			<h3 class="section-2">租费设置</h3>
			<ExpenseSetting :expense="form.expense" :otherCost='otherCost'></ExpenseSetting>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button type="primary" @click="submitForm('form')">续租</el-button>
		</div>

	</div>
</template>

<script>
	import UserProfile from '../relet/UserProfile.vue';
	import {
		HouseProfile,
		Contract,
		ExpenseSetting
	} from '../contract'
	import _ from 'lodash';
	import fp from 'lodash/fp';
	import {
		addYears,
		format,
		getTime,
		subDays
	} from 'date-fns';

	export default {
		props: {
			item: {
				type: Object
			},
			contractsId: {
				required: true
			},
			itemRoom: {
				type: Object
			},
			itemHouse: {
				type: Object
			},
			houseFormat: {
				type: String
			}
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			},
			otherCost() {
				return _.filter(this.configList, {
					group: "加收费用"
				})
			}
		},
		mounted() {
			if (!_.isUndefined(this.itemHouse)) {
				if (this.itemRoom.contract.id !== undefined) {
					this.form = this.newModel(new Date((this.itemRoom.contract.to + 1) * 1000))
				}
				this.form.property.house =
					`${this.itemHouse.location.name}${this.itemHouse.building}${this.itemHouse.unit}${this.itemHouse.roomNumber}${this.itemRoom.name}`
				this.form.property.roomId = this.itemRoom.id
			}
			this.form.property.houseType = this.houseFormat
		},
		watch: {
			otherCost(newVal, oldVal) {
				this.form.expense.extra = newVal.map((ele, index) => {
					var extraCost = {
						configId: ele.id,
						name: ele.key,
						type: 'extra',
						rent: '',
						pattern: 'withRent'
					}
					if (extraCost.name === "电费") {
						extraCost.pattern = "prepaid"
					}
					
					return extraCost
				})
			}
		},
		created() {
			this.query()
		},
		data() {
			const today = new Date();
			return {
				form: this.newModel(today),
				changeuserdata: '',
				configList: [],
				contractInfo: '',
				showUser: false,
				loading: true
			};
		},
		methods: {
			query() {
				this.$model('config_list')
					.query({}, {
						projectId: this.projectId
					})
					.then(res => {
						this.$set(this, 'configList', res)
					})
					.catch(err => console.log(err))
				this.$model('contracts_info')
					.query({}, {
						projectId: this.projectId,
						contractId: this.contractsId
					})
					.then(res => {
						this.$set(this, 'contractInfo', res)
						this.setUser()
					})
					.catch(err => {
					})
			},
			setUser() {
				this.form.user.name = this.contractInfo.user.name
				this.form.user.accountName = this.contractInfo.user.accountName
				this.form.user.mobile = this.contractInfo.user.mobile
				this.form.user.gender = this.contractInfo.user.gender
				this.form.user.documentId = this.contractInfo.user.documentId
				this.form.user.id = this.contractInfo.user.id
				this.form.expense.standard.rent = this.contractInfo.strategy.freq.rent/100
				this.form.expense.standard.pattern = this.contractInfo.strategy.freq.pattern.toString()
				this.form.expense.bond = this.contractInfo.strategy.bond/100
				this.form.user.documentType = 1
				this.contractInfo.expenses.forEach(element => {
					switch(element.configId)
					{
						case 1041:
							this.$set(this.form.expense.extra[0],'pattern',element.pattern)
							this.$set(this.form.expense.extra[0],'rent',(element.rent/100).toFixed(2))
						break;
					}
				});
				this.showUser = true
				this.loading = false
			},
			onselect(userdata) {
				this.changeuserdata = userdata
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$model('contracts')
							.create(this.translate(this.form), {
								projectId: this.projectId
							})
							.then(() => {
								this.closeDialog();
								this.resetForm();
								this.$message({
									message: '续租成功',
									type: 'success'
								});
							});
					} else {
						return false;
					}
				});
			},
			defaultStart(now) {
				return now;
			},
			defaultEnd(now) {
				return subDays(addYears(now, 1),1);
			},
			newModel(today) {
				return {
					user: {
						name: '',
						accountName: '',
						mobile: '',
						gender: 'M',
						documentId: '',
						documentType: 1
					},
					property: {
						houseType: 'SOLE',
						house: ''
					},
					contract: {
						leaseStart: this.defaultStart(today),
						leaseEnd: this.defaultEnd(today),
						contractNumber: '',
						signUpDate: this.defaultStart(today)
					},
					expense: {
						billPlan: '-',
						offset: 2,
						standard: {
							name: '常规租金',
							rent: 360,
							pattern: '1'
						},
						extra: [{
								configId: 1041,
								name: '电费',
								type: 'extra',
								rent: 1.2,
								pattern: 'prepaid'
							},
							{
								configId: 1043,
								name: '水费',
								type: 'extra',
								rent: 20,
								pattern: '1'
							}
						],
						
						bond: 2600
					},
					strategy: {
						freq:{},
					},
				}
			},
			resetForm() {
				this.form = this.newModel(new Date());
			},
			translate(form) {
				return {
					user: form.user,
					roomId: form.property.roomId,
					from: getTime(form.contract.leaseStart) / 1000,
					to: getTime(form.contract.leaseEnd) / 1000,
					strategy: this.createStrategy(form),
					expenses: this.createExpense(form),
					paymentPlan: this.createPaymentPlan(form.expense),
					signUpTime: getTime(form.contract.signUpDate) / 1000
				}
			},
			createPaymentPlan(expense) {
				return `${expense.billPlan}${expense.offset}`;
			},
			createStrategy(form) {
				return {
					freq: this.unitAsCent(_.pick(form.expense.standard, ['rent', 'pattern'])),
					bond: form.expense.bond * 100
				}
			},
			createExpense(form) {
				const extraExpense = _.filter(fp.map(extra => _.pick(extra, ['configId', 'rent', 'pattern', 'frequency']))(form.expense
					.extra), function (o) {
					return o.rent
				});
				return fp.map(this.unitAsCent)(extraExpense);
			},
			closeDialog() {
				this.$refs['form'].resetFields();
				this.$modal.$emit('dismiss');
			},
			unitAsCent(obj) {
				const rent = obj.rent * 100;
				return fp.defaults(obj, {
					rent
				});
			}
		},
		components: {
			UserProfile,
			HouseProfile,
			Contract,
			ExpenseSetting
		}
	};
</script>

<style lang="less" scoped>
	.dialog-footer {
		text-align: right;
	}

	.section-2 {
		margin-top: 30px;
	}
</style>

<style lang="less">
	.add-contract.modal {
		.el-input-group__prepend {
			min-width: 88px;
		}
	}
</style>