<template>
	<div class="modal">
		<el-form :model="form" class="v-form" label-width="100px">
			<el-form-item label="承租信息">
				<el-row>

					<el-col :span="8">
						<el-input placeholder="必填" v-model="name">
							<template slot="prepend">姓名</template>
						</el-input>
					</el-col>
					<el-col :span="8">
						<el-input placeholder="必填(建议手机号)" v-model="account">
							<template slot="prepend">账号</template>
						</el-input>
					</el-col>
					<el-col :span="8">
						<el-input placeholder="选填" v-model="phone">
							<template slot="prepend">电话</template>
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-input placeholder="男" v-model="gender">
							<template slot="prepend">性别</template>
						</el-input>
					</el-col>
					<el-col :span="16">
						<el-input placeholder="选填" v-model="idNumber">
							<template slot="prepend">身份证</template>
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-select v-model="houseType" class="house-type">
							<el-option label="全部" value="1"></el-option>
							<el-option label="整租" value="2"></el-option>
							<el-option label="合租" value="3"></el-option>
							<el-option label="独栋" value="4"></el-option>
						</el-select>
						<template slot="prepend">承租房源</template>

					</el-col>
					<el-col :span="16">
						<el-autocomplete
								class="inline-input"
								v-model="house"
								:fetch-suggestions="querySearch"
								placeholder="搜索房源编号、小区名称等关键字"
								:trigger-on-focus="false"
								@select="handleSelect">
						</el-autocomplete>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">
						<template>租期</template>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="2017-09-09" v-model="leaseStart">
							<template slot="prepend">范围</template>
						</el-input>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="2018-09-09" v-model="leaseEnd">
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">
						<template>合同描述</template>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="JG4133" v-model="contractNumber">
							<template slot="prepend">合同编号</template>
						</el-input>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="2017-09-01" v-model="signUpDate">
							<template slot="prepend">签约日期</template>
						</el-input>
					</el-col>
				</el-row>
			</el-form-item>

			<el-form-item label="租费设置">
				<el-row>
					<el-col :span="3">
						<template>收租时间</template>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="必填" v-model="billPlan">
							<template slot="prepend">账单</template>
						</el-input>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="5天" v-model="offset">
							<template slot="append">收租</template>
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">
						<template>租金</template>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="3600月" v-model="rent">
							<template slot="prepend">常规租金</template>
						</el-input>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="一月一付" v-model="rentPaymentMethod">
							<template slot="prepend">方式</template>
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">
						<template>附加费用</template>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="3600月" v-model="electricityBill">
							<template slot="prepend">电费</template>
						</el-input>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="预付费" v-model="ePaymentMethod">
							<template slot="prepend">方式</template>
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :offset="3" :span="9">
						<el-input placeholder="1.2度" v-model="waterBill">
							<template slot="prepend">水费</template>
						</el-input>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="随租金付" v-model="wPaymentMethod">
							<template slot="prepend">方式</template>
						</el-input>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="3">
						<template>押金</template>
					</el-col>
					<el-col :span="9">
						<el-input placeholder="3600" v-model="bond">
							<template slot="prepend">常规押金</template>
						</el-input>
					</el-col>

				</el-row>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button>取 消</el-button>
			<el-button type="primary">创建租户</el-button>
		</div>
	</div>
</template>

<script>
	import Modal from '~/plugins/modal';


	export default {
		data() {
			return {
				form: {
					name: '',
					account: '',
					phone: '',
					gender: '',
					idNumber: '',
					houseType: '1',
					house: '',
					leaseStart: '',
					leaseEnd: '',
					contractNumber: '',
					signUpDate: '',
					billPlan: '',
					offset: '',
					rent: '',
					rentPaymentMethod: '',
					electricityBill: '',
					ePaymentMethod: '',
					waterBill: '',
					wPaymentMethod: '',
					bond: ''

				}
			};
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
		width: 100%;
	}

	.house-input {
		width: 0;
	}
</style>

