<template>
    <div class="modal add-contract">
        <el-form :model="form" ref="form" class="v-form">
            <h3>承租信息</h3>
            <UserProfile :profile="form.profile"></UserProfile>
            <HouseProfile :property="form.property"></HouseProfile>
            <ContractDetail :contract="form.contract"></ContractDetail>

            <h3 class="section-2">租费设置</h3>
            <ExpenseSetting :expense="form.expense"></ExpenseSetting>

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

	import {addYears, format} from 'date-fns';

	export default {
		props: {
			closeDialog: {
				type: Function,
				required: true
			}
		},
    	data() {
			const today = new Date();
    		return {
    			form: {
    				profile: {
    					name: '',
    					account: '',
    					phone: '',
    					gender: 1,
    					idNumber: '',
    					idType: 1
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
    					billPlan: 1,
    					offset: 2,
    					standard: {
    						id: 1,
    						name: '常规租金',
    						type: '2',
    						amount: 3600,
    						paymentMethod: '一月一付'
    					},
    					extra: [
    						{
    							id: 2,
    							name: '电费',
    							type: '2',
    							amount: 1.2,
    							paymentMethod: '预付费'
    						},
    						{
    							id: 3,
    							name: '水费',
    							type: 'water',
    							amount: 20,
    							paymentMethod: '随租金付'
    						}
    					],
    					bond: 2600
    				}
    			}
    		};
    	},
    	methods: {
    		submitForm(formName) {
    			console.log(formName);
    			this.$refs[formName].validate(valid => {
    				if (valid) {
						console.log('submit!', this.form);
						this.closeDialog();
					} else {
						console.log('error in submitting ...');
						return false;
    				}
    			});
    		},
			defaultStart(now) {
				return format(now, 'YYYY-MM-DD');
			},
			defaultEnd(now) {
				return format(addYears(now, 1), 'YYYY-MM-DD');
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