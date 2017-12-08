<template>
	<div class="modal add-contract" v-on:useralldata="onselect">
		<el-form :model="form" ref="form" class="v-form">
			<h3>续租</h3>
			<UserProfile :user="form.user"></UserProfile>
			<HouseProfile :property="form.property"></HouseProfile>
			<ContractDetail :contract="form.contract"></ContractDetail>

			<h3 class="section-2">租费设置</h3>
			<ExpenseSetting :expense="form.expense"></ExpenseSetting>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button type="primary" @click="submitForm('form')">续租</el-button>
		</div>
		
	</div>
</template>

<script>
	import UserProfile from '../relet/UserProfile.vue';
	import HouseProfile from '../relet/HouseProfile.vue';
	import ContractDetail from '../relet/ContractDetail.vue';
	import ExpenseSetting from '../relet/ExpenseSetting.vue';

	import {addYears, format, getTime} from 'date-fns';

	export default {
		props: {
            item: {
                type: Object
            }
        },
		data() {
			const today = new Date();
			return {
				form: this.newModel(today),
				changeuserdata: ''
			};
		},
		mounted(){
			console.log(this.form)
		},
		methods: {
			onselect(userdata){
				console.log(1)
				this.changeuserdata = userdata
				console.log(this.changeuserdata)
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('submit: ', this.translate(this.form));
						this.$model('contracts').create(this.translate(this.form)).then((d) => {
							console.log(d);
							this.closeDialog();
							this.resetForm();
							this.successmessage();
						});
					} else {
						console.log('error in submitting ...');
						return false;
					}
				});
			},
			defaultStart(now) {
				return now;
			},
			defaultEnd(now) {
				return addYears(now, 1);
			},
			newModel(today) {
				return {
					user: {
						name: this.item.user.name,
						accountName: this.item.user.accountName,
						mobile: this.item.user.mobile,
						gender: this.item.user.gender,
						documentId: this.item.user.documentId,
						documentType: 1
					},
					property: {
						houseType: '1',
						house: ''
					},
					contract: {
						leaseStart: this.defaultStart(today),
						leaseEnd: this.defaultEnd(today),
						contractNumber: '',
						signUpDate: this.defaultStart(today)
					},
					expense: {
						billPlan: 'F',
						offset: 2,
						standard: {
							id: 1,
							name: '常规租金',
							type: '2',
							amount: 3600,
							paymentMethod: 'perMonth'
						},
						extra: [
							{
								id: 2,
								name: '电费',
								type: '2',
								amount: 1.2,
								paymentMethod: 'prepaid'
							},
							{
								id: 3,
								name: '水费',
								type: 'water',
								amount: 20,
								paymentMethod: 'perMonth'
							}
						],
						bond: 2600
					}
				}
			},
			resetForm() {
				this.form = this.newModel(new Date());
			},
			translate(form) {
				return {
					user: form.user,
					"roomId": form.property.roomId,
					"from": getTime(form.contract.leaseStart) / 1000,
					"to": getTime(form.contract.leaseEnd) / 1000,
					"strategy": this.createStrategy(form),
					"expenses": this.createExpense(form),
					"paymentPlan": this.createPaymentPlan(form.expense),
					"signUpTime": getTime(form.contract.signUpDate) / 1000
				}
			},
			createPaymentPlan(expense) {
				return `${expense.billPlan}${expense.offset}`;
			},
			createStrategy(form) {
				return {
					"daily": {
						"amount": 10000
					},
					"monthly": {
						"once": 0,
						"freq": {
							"interval": "1/2/3/6/12",
							"amount": 10000
						},
						"customer": [
							{
								"from": 1509976830,
								"to": 1509976830,
								"forFree": "0不免租金/1免租金",
								"amount": 10000,
								"interval": "1/2/3/6/12"
							}
						]
					}
				}
			},
			createExpense(form) {
				return [
					{
						"cfgId": "1/2/3...",
						"amount": 10000,
						"interval": "1/2/3/6/12"
					}
				]
			},
			closeDialog() {
				this.$refs['form'].resetFields();
				this.$modal.$emit('dismiss');
			},
			successmessage() {
				this.$message({
          		message: '续租成功',
          		type: 'success'
        		});
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