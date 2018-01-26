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
	import {HouseProfile,Contract,ExpenseSetting} from '../contract'

	import {addYears, format, getTime} from 'date-fns';

	export default {
		props: {
            item: {
                type: Object
			},
			contractsId:{
				required:true
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
			},
			contractInfo(newVal,oldVal){
				console.log(newVal)
			}
		},
		created(){
			this.query()
		},
		data() {
			const today = new Date();
			return {
				form: this.newModel(today),
				changeuserdata: '',
				configList:[],
				contractInfo:'',
				showUser:false,
				loading: true
			};
		},
		mounted(){
			console.log(this.form)
		},
		methods: {
			query(){
				this.$model('config_list')
				.query({},{projectId:this.projectId})
				.then(res=>{this.$set(this,'configList',res)})
				.catch(err=>console.log(err))
				this.$model('contracts_info')
                .query({},{projectId:this.projectId,contractId:this.contractsId})
                .then(res=>{
					this.$set(this,'contractInfo',res)
					this.setUser()
                })
                .catch(err=>{
                    console.log(err,'asdfa')
                })
			},
			setUser(){
				this.form.user.name = this.contractInfo.user.name
				this.form.user.accountName = this.contractInfo.user.accountName
				this.form.user.mobile = this.contractInfo.user.mobile
				this.form.user.gender = this.contractInfo.user.gender
				this.form.user.documentId = this.contractInfo.user.documentId
				this.form.user.documentType = 1
				this.showUser = true
				this.loading = false
			},
			onselect(userdata){
				console.log(1)
				this.changeuserdata = userdata
				console.log(this.changeuserdata)
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('submit: ', this.translate(this.form));
						this.$model('contracts')
							.create(this.translate(this.form), {projectId: this.projectId})
							.then( () => {
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
								configId: 2,
								name: '电费',
								type: 'extra',
								rent: 1.2,
								pattern: 'prepaid'
							},
							{
								configId: 3,
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