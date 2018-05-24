<template>
	<div class="modal add-contract">
		<el-form :model="form" ref="form" class="v-form">
			<h3>承租信息</h3>
			<UserProfile :user="form.user"></UserProfile>
			<HouseProfile :property="form.property" @roomChange="roomChange"></HouseProfile>
			<ContractDetail :contract="form.contract"></ContractDetail>

			<h3 class="section-2">租费设置</h3>
			<ExpenseSetting :expense="form.expense" :enabledExtras='availableExtras'></ExpenseSetting>
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

import { addYears, format, getTime, subDays } from 'date-fns';
import _ from 'lodash';
import fp from 'lodash/fp';

export default {
	props: {
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
		}
	},
	watch: {
		availableExtras(newVal, oldVal) {
			this.form.expense.extra = newVal.map((ele,) => ({
				configId: ele.id,
				name: ele.key,
				type: 'extra',
				rent: '',
				pattern: 'withRent'
			}));
		}
	},
	created() {
		this.query();
	},
	data() {
		const today = new Date();
		return {
			form: this.newModel(today),
			configList: [],
			availableExtras: []
		};
	},
	mounted() {
		if (!_.isUndefined(this.itemHouse)) {
			if (this.itemRoom.contract.id !== undefined) {
				this.form = this.newModel(
					new Date((this.itemRoom.contract.to + 1) * 1000)
				);
			}
			this.form.property.house = `${this.itemHouse.location.name}${
				this.itemHouse.building
			}${this.itemHouse.unit}${this.itemHouse.roomNumber}${
				this.itemRoom.name
			}`;
			this.form.property.roomId = this.itemRoom.id;
			this.form.property.disabled = true;
		}
		this.form.property.houseType = this.houseFormat;
	},
	methods: {
		query() {
			this.$store
				.dispatch('GET_OTHERCOST')
				.then(data => {
					this.availableExtras = fp.filter(fp.get('enabled'))(data)
				});
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (this.form.expense.standard.rent <= 0) {
						this.$message.error('租金不可以小于0');
					} else {
						this.$model('contracts')
							.create(this.translate(this.form), {
								projectId: this.projectId
							})
							.then(res => {
								this.closeDialog();
								this.resetForm();
								this.successMessage();
							})
							.catch(err => {
								let _this = this;
								switch (err.code) {
									// 账号重复
									case 20000013:
										_this.$message('创建失败，用户账号已存在');
										break;
										// 同一时间，同一个房间又一合同
									case 21000009:
										_this.$message('创建失败，房间已出租');
										break;
									case 21000010: //合约校验错误
										_this.$message('创建失败，合同校验错误');
										break;
										// 数据库错误
									case 90000001:
										_this.$message('数据库执行错误，请稍后再试');
										break;
										// 其他
									default:
										_this.$message('创建失败');
										break;
								}
							});
					}
				} else {
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
		roomChange(data) {
			this.$model('house_info')
				.query(
					{
						houseFormat: this.form.property.houseType
					},
					{
						projectId: this.projectId,
						houseId: data
					}
				);
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
					offset: null,
					standard: {
						name: '常规租金',
						rent: 3600,
						pattern: '1'
					},
					extra: [{
						configId: 1043,
						name: '冷水费',
						type: 'extra',
						rent: '',
						pattern: 'withRent'
					}],
					bond: 2600
				}
			};
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
			};
		},
		createPaymentPlan(expense) {
			const number = `0${expense.offset}`.slice(-2);
			return `${expense.billPlan}${number}`;
		},
		createStrategy(form) {
			return {
				freq: this.unitAsCent(
					_.pick(form.expense.standard, ['rent', 'pattern'])
				),
				bond: form.expense.bond * 100
			};
		},
		createExpense(form) {
			const extraExpense = _.filter(
				fp.map(extra =>
					_.pick(extra, ['configId', 'rent', 'pattern', 'frequency'])
				)(form.expense.extra),
				function(o) {
					return o.rent;
				}
			);
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
			this.$emit('successRefresh');
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