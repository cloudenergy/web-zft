<template>
	<div class="modal add-contract">
		<el-form :model="form" ref="form" class="v-form">
			<h3>承租信息</h3>
			<UserProfile :user="form.user"></UserProfile>
			<HouseProfile :property="form.property"></HouseProfile>
			<ContractDetail :contract="form.contract"></ContractDetail>

			<h3 class="section-2">租费设置</h3>
			<ExpenseSetting :expense="form.expense" :otherCost='otherCost'></ExpenseSetting>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button type="primary" @click="submitForm('form')">创建租户</el-button>
		</div>
	</div>
</template>

<script>
	import UserProfile from './UserProfile.vue';
	import HouseProfile from './HouseProfile.vue';
	import ContractDetail from './ContractDetail.vue';
	import ExpenseSetting from './ExpenseSetting.vue';

	import {addYears, format, getTime} from 'date-fns';
	import _ from 'lodash';
	import fp from 'lodash/fp';

	export default {
		props: {
			itemRoom:{
				type:Object
			},
			itemHouse: {
				type:Object
			}
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			},
			otherCost() {
				return _.filter(this.configList,{group:"加收费用"})
			}
		},
		watch: {
			otherCost(newVal,oldVal){
				this.form.expense.extra=newVal.map((ele,index)=>{
					var extraCost = {
						configId:ele.id,
						name:ele.key,
						type:'extra',
						rent:'',
						pattern:'withRent'
					} 
					if(extraCost.name==="电费"){
						extraCost.pattern="prepaid"
					}
					return extraCost
				})
			}
		},
		created(){
			this.query()
		},
		data() {
			const today = new Date();
			return {
				form: this.newModel(today),
				configList:[]
			};
		},
		mounted() {
			if(!_.isUndefined(this.itemHouse)) {
				this.form.property.house = `${this.itemHouse.location.name}${this.itemHouse.building}${this.itemHouse.unit}${this.itemHouse.roomNumber}${this.itemRoom.name}`
				this.form.property.roomId = this.itemRoom.id
				this.form.property.disabled = true
			}
		},
		methods: {
			query(){
				this.$model('config_list')
				.query({},{projectId:this.projectId})
				.then(res=>{this.$set(this,'configList',res)})
				.catch(err=>console.log(err))
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('submit: ', this.translate(this.form));

						this.$model('contracts')
							.create(this.translate(this.form), {projectId: this.projectId})
							.then((res) => {
								this.closeDialog();
								this.resetForm();
								this.successMessage();
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
						billPlan: 'F',
						offset: 2,
						standard: {
							name: '常规租金',
							rent: 3600,
							pattern: '6'
						},
						extra: [
							{
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
					}
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
					contractNumber: _.get(form, 'contract.contractNumber', ''),
					strategy: this.createStrategy(form),
					expenses: this.createExpense(form),
					paymentPlan: this.createPaymentPlan(form.expense),
					signUpTime: getTime(form.contract.signUpDate) / 1000
				}
			},
			createPaymentPlan(expense) {
				const number = `0${expense.offset}`.slice(-2);
				return `${expense.billPlan}${number}`;
			},
			createStrategy(form) {
				return {
					freq: this.unitAsCent(_.pick(form.expense.standard, ['rent', 'pattern'])),
					bond: form.expense.bond * 100
				}
			},
			createExpense(form) {
				const extraExpense = fp.map(extra => _.pick(extra, ['configId', 'rent', 'pattern']))(form.expense.extra);
				return fp.map(this.unitAsCent)(extraExpense);
			},
			closeDialog() {
				this.$refs['form'].resetFields();
				this.$modal.$emit('dismiss');
			},
			successMessage() {
				this.$message({
					message: '创建成功',
					type: 'success'
        		});
			},
			unitAsCent(obj) {
				const rent = obj.rent * 100;
				return fp.defaults(obj, {rent});
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