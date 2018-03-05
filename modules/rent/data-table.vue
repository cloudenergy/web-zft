<template>
	<div id="rentinfo">
		<el-table :data="housesRent" style="width: 100%">
			<el-table-column type="index" width="50" :index="indexMethod" label="序号">
            </el-table-column>
			<el-table-column label="承租状态" width="100">
				<template slot-scope="scope">
					<div slot="reference" class="contractStatus cursorp flexcenter">
						<div v-if="nowData<scope.row.from" class="willIn">
							<span class="willIn">待入</span>
						</div>
						<div v-if="scope.row.from<nowData&&nowData<scope.row.to" class="inThere">
							<span class="inThere">在租</span>

						</div>
						<div v-if="nowData>scope.row.to" class="overdue">
							<span class="overdue">逾期</span>
						</div>
						<icon type="icon-test1" :symbol="true" v-if="scope.row.user.gender==='M'" />
						<icon type="icon-test" :symbol="true" v-if="scope.row.user.gender==='F'" />
					</div>
				</template>
			</el-table-column>
			<el-table-column label="姓名" min-width="120">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper cursorp" @click="rentuser('1',scope.row)">
						<span size="medium">{{ scope.row.user.name }}
							<el-popover trigger="hover" placement="top">
								<p v-if="scope.row.user.mobile!=''">{{ scope.row.user.mobile }}</p>
								<p v-if="scope.row.user.mobile==''">暂无信息</p>
								<span slot="reference" class="name-wrapper">
									<i class="el-icon-phone" style="color:#aaa"></i>
								</span>
							</el-popover>
						</span>
						<p>{{ scope.row.user.accountName }}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="房源/租期" min-width="300" max-width="500">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper cursorp" @click="rentuser('2',scope.row)">
						<div>{{ scope.row.room.locationName }}{{ scope.row.room.building }}{{ scope.row.room.unit }}{{ scope.row.room.roomNumber}}{{
							scope.row.room.roomName }}</div>
						<div class="rent-bottom">
							<span>{{ scope.row.fromDate }}&nbsp;&nbsp;至&nbsp;&nbsp;{{ scope.row.toDate }}</span>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="预付费余额(¥)" width="100" align="right">
				<template slot-scope="scope">
					<div class="flexcenter">
						<span class="userCashAmount" :class="{lowPrice:scope.row.user.cashAccount.balance<2000}">{{price(scope.row.user.cashAccount.balance)}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column width="50">
				<template slot-scope="scope">
				</template>
			</el-table-column>
			<el-table-column label="余额操作" width="100">
				<template slot-scope="scope">
					<div class="flexcenter" style="padding-right: 15px">
						<el-dropdown  size="medium">
							<span class="el-dropdown-link cursorp">
								充值
								<i class="el-icon-caret-bottom"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="paym(scope.row)">充值</el-dropdown-item>
								<el-dropdown-item @click.native="callMobilebile()">催交</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="合同操作" width="100">
				<template slot-scope="scope">
					<el-dropdown size="medium">
						<span class="el-dropdown-link cursorp">
							续租
							<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="item in list2" :key="item.value" @click.native="rentuser2(scope.row,item.value)">{{item.showlist}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
			<el-table-column label="费用清单" width="100">
				<template slot-scope="scope">
					<div class="flexcenter">
						<div class="rentMoneyshow">
							<span class="el-dropdown-link cursorp bigSize" @click="rentuser(3,scope.row)">
								查看
							</span>
						</div>
					</div>
				</template>
			</el-table-column>

		</el-table>
		<!-- 租户详情信息清单 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="65%" class="">
			<div></div>
			<div class="flexc rgbc">
				<userInfoImage :contractInfo="updateData"/>
				<div style="flex:1;margin-left:30px;">
					<div class="flexc dialog" style="color:#aaa">
						<div @click="changeUserInfo(1)" class="cursorp" :class="{activerent:showinf==1}">租户详情</div>
						<div @click="changeUserInfo(2)" class="cursorp" :class="{activerent:showinf==2}">租约信息</div>
						<div class="menu-right">
							<div class="flexcenter">
								<span @click="changeUserInfo(3)" class="cursorp" :class="{activerent:showinf==3}">费用清单</span>
								<div v-if="showinf==3" class="flexc menu-rightthree cursorpoin">
									<div @click="rentPay(1)" :class="{activerent:showmoney==1}">预付费扣费</div>
									<div @click="rentPay(2)" :class="{activerent:showmoney==2}">账单扣费</div>
									<div @click="rentPay(3)" :class="{activerent:showmoney==3}">充值记录</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="showinf==1" class="triangle cursorfir">基本信息</div>
					<div v-if="showinf==2" class="triangle cursorsec">合同信息</div>
					<div v-if="showinf==3" class="triangle cursorthi">账单信息</div>
					<Rentinfo v-if="showinf==1" :form="updateData" />
					<Rentmessasge v-if="showinf==2" :form="updateData" />
					<Rentmoney v-if="showinf==3&&showmoney==1" :form="updateData" />
					<Rentlease v-if="showinf==3&&showmoney==2" :form="contractbill" />
					<Rentsendmoney v-if="showinf==3&&showmoney==3" :form="updateData" />
				</div>
			</div>
		</el-dialog>
		<!-- 用户信息预览 -->
		<el-dialog :title="dialogTitle4" :visible.sync="dialogVisible4" width="800px">
			<RentWithout :id="updateData.id" :userId="updateData.user" ref="operate" @successInfo="successInfo" @operateRent="operateRent"/>
		</el-dialog>
		<el-pagination :background="background" layout="prev, pager, next" :total='housesrentData.paging.count' @current-change="handleCurrentChange"
		    style="margin-top:5px;text-align:right" :page-size='20'>
		</el-pagination>
	</div>
</template>

<script>
	import {
		Rentinfo,
		Rentlease,
		Rentmessasge,
		Rentmoney,
		Rentsendmoney,
		Relet,
		Showrent,
		Paym,
		RentWithout
	} from '../userinfo';
	import userInfoImage from '../userinfo/userInfoImage.vue'
	export default {
		components: {
			Rentinfo,
			Rentlease,
			Rentmessasge,
			Rentmoney,
			Rentsendmoney,
			Relet,
			Showrent,
			Paym,
			RentWithout,
			userInfoImage
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			},
			housesRent() {
				return this.housesrentData.data;
			},
			nowData() {
				return Date.parse(new Date()) / 1000;
			}
		},
		props: {
			housesrentData: {
				required: true
			},
			index: {
				required:true
			}
		},
		data() {
			return {
				background: true,
				contractbill: '',
				updateData: {},
				dialogVisible: false,
				dialogTitle: '详细信息',
				dialogVisible2: false,
				dialogTitle2: '用户续租',
				dialogVisible3: false,
				dialogTitle3: '预览租客合同',
				dialogVisible4: false,
				dialogTitle4: '退租结算',
				showinf: 1,
				showmoney: 1,
				list1: [{
						showlist: '租户详情',
						value: 1
					},
					{
						showlist: '租约信息',
						value: 2
					},
					{
						showlist: '费用清单',
						value: 3
					}
				],
				list2: [{
						showlist: '续租',
						value: 1
					},
					{
						showlist: '删除',
						value: 2
					},
					{
						showlist: '退租',
						value: 4
					}
				],
				userdatainfo: {
					contractId: 1,
					roomId: 430000,
					user: {
						id: 111111111,
						accountName: 'accountName',
						name: 'username',
						mobile: '111111111111',
						documentId: '11111111111',
						documentType: 1,
						gender: 'M'
					}
				}
			};
		},
		created() {
			this.updateData = this.userdatainfo;
			this.$modal.$on('refresh', () => this.$emit('paymFresh'));
		},
		methods: {
			indexMethod(data) {
				return (this.index-1)*20+data+1
			},
			price(data) {
				return (data / 100).toFixed(2);
			},
			successInfo() {
				this.$emit('rentWithout')
			},
			rentuser(value, item) {
				this.updateData.user = item.user;
				this.$model('contracts_info')
					.query({}, {
						projectId: this.projectId,
						contractId: item.id
					})
					.then(res => {
						this.updateData = res;
					})
					.catch(err => {
						console.log(err);
					});
				this.$model('contract_bill')
					.query({}, {
						projectId: this.projectId,
						id: item.id
					})
					.then(data => this.$set(this, 'contractbill', data));
				this.dialogVisible = true;
				this.showinf = value;
			},
			rentuser2(data, value) {
				var that = this;
				this.updateData = data;
				if (value == 1) {
					// 打开续租页面
					this.$modal.$emit('open', {
						comp: Relet,
						data: {
							contractsId: data.id
						},
						title: '续租'
					});
				} else if (value == 2) {
					// 删除租户
					this.$confirm('此操作将删除该租户, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						})
						.then(() => {
							this.$model('contracts')
								.delete({}, {
									projectId: this.projectId,
									id: data.id
								})
								.then(data => {
									this.$message({
										type: 'success',
										message: '删除成功!'
									});
									this.$emit('refresh');
								});
						})
						.catch(err => {
							this.mistake('取消删除');
						});
				} else if (value == 4) {
					this.dialogVisible4 = true;
				} else {
					this.dialogVisible3 = true;
				}
			},
			operateRent() {
				this.dialogVisible4 = false;
			},
			changeUserInfo(data) {
				this.showinf = data;
			},
			rentPay(datanum) {
				this.showmoney = datanum;
			},
			callMobilebile() {
				this.$confirm('将要发送催缴通知，是否继续？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						this.$message({
							type: 'success',
							message: '提醒成功!'
						});
					})
					.catch(err => {
						this.$message({
							type: 'info',
							message: '取消提醒'
						});
					});
			},
			// 除了电子支付其余的手段
			paym(date) {
				this.$modal.$emit('open', {
					comp: Paym,
					data: {
						contractInfo: date
					},
					className:'paym',
					title: '充值'
				});
			},
			successRefresh() {
				this.$emit('refresh');
			},
			mistake(data) {
				this.$message({
					type: 'info',
					message: data
				});
			},
			handleCurrentChange(val) {
				this.$emit('pageSize', val);
			}
		}
	};
</script>


<style lang="less" scoped>
	.contractStatus {
		.willIn {
			color: #4cb774;
		}
		.overdue {
			color: rgb(219, 71, 71);
		}
		.inThere {
			color: #84aee5;
		}
		i {
			font-size: 20px;
			margin-right: -10px;
		}
	}

	.lowPrice {
		color: #F03D53
	}

	.rent-bottom {
		color: #aaa;
	}

	.rentMoneyshow {
		font-size: 12px;
		i.el-icon--right {
			margin-left: 0;
		}
	}

	.dialog>div {
		margin-right: 50px;
	}

	.menu-right {
		flex: 1;
	}
	.bigSize{
		font-size: 14px;
	}
	.menu-rightthree div {
		margin-left: 15px;
	} // .textcenter{
	// 	text-aline: center;
	// }
	.setborder {
		border: 1px solid #ddd;
		width: 225px;
		.botborder {
			border-bottom: 1px solid #ddd;
			i{
				margin: 25px 0 10px 0;
				width: 75px;
				height: 75px;
			}
		}
		.others {
			height: 100px;
		}
		.border-bottom{
			margin-bottom:3px;

		}
	}

	.userinfobot {
		margin-left: 5px;
		color: rgb(170, 170, 170);
		>div:first-child {
			margin-top: 16px;
		}
		>div>p:nth-child(1) {
			color: #000;
		}
	}

	.triangle {
		line-height: 40px;
		background-color: #f5f7fa;
		margin: 10px 0;
		position: relative;
	}

	.triangle:before {
		content: '';
		width: 20px;
		height: 40px;
		background-color: #f5f7fa;
		display: inline-block;
		position: absolute;
		top: 0;
		left: -20px;
	}

	.triangle:after {
		content: '';
		width: 0;
		height: 0;
		border-right: 12px solid transparent;
		border-bottom: 12px solid #f5f7fa;
		border-left: 12px solid transparent;
		display: block;
		position: absolute;
		top: -12px;
	}

	.cursorfir:after {
		left: 14px;
	}

	.cursorsec:after {
		left: 120px;
	}

	.cursorthi:after {
		left: 226px;
	}

	div.activerent,
	span.activerent {
		color: #000;
	}

	.islosem {
		color: #f03d53;
	}

	.userCashAmount {
		margin-left: 5px;
		text-align: right;
		display: block;
		width: 100%;
	}
</style>
<style>
	.contractStatus i {
		width: 35px;
		height: 35px;
	}

	.contractStatus i svg {
		width: 35px;
		height: 35px;
	}
	.botborder i svg {
		width: 75px;
		height: 75px;
	}
	.paym>div.el-dialog {
		width: 800px;
	}
</style>