<template>
	<div id="rentinfo">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="姓名" width="120">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<span size="medium">{{ scope.row.name }}
							<el-popover trigger="hover" placement="top">
								<p>{{ scope.row.phone }}</p>
								<span slot="reference" class="name-wrapper">
									<i class="el-icon-phone"></i>
								</span>
							</el-popover>
						</span>
						<p style="margin-left: 10px">{{ scope.row.phone }}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="房源/租期" min-width="480" max-width="600">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>Name: {{ scope.row.name }}</p>
						<p>Addr: {{ scope.row.address }}</p>
						<div slot="reference" class="name-wrapper">
							<div>{{ scope.row.address }}</div>
							<div class="rent-bottom">
								<span>￥{{ scope.row.rentdate }}</span>
							</div>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="租金" min-width="258">
				<template slot-scope="scope">
					<div class="flexcenter">
						<div class="name-wrapper">
							<span>￥{{ scope.row.rentalMounthMoney }}元/月&nbsp;×&nbsp;</span>
							<span>{{ scope.row.rentalYear }}年</span>
							<div class="rent-bottom">
								<span>￥{{ scope.row.rentcash }}/押</span>
								<span>&nbsp;&nbsp;{{scope.row.rentakMounthpay}}月一付</span>
							</div>
						</div>
						<div class="rentMoneyshow">
							<el-dropdown>
								<span class="el-dropdown-link cursorp">
									查看
									<i class="el-icon-caret-bottom el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="item in list1" :key="item.value" @click.native="rentuser(scope.$index,item.value,scope.row)">{{item.showlist}}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>&nbsp;|&nbsp;
							<el-dropdown>
								<span class="el-dropdown-link cursorp">
									续租
									<i class="el-icon-caret-bottom el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="item in list2" :key="item.value" @click.native="rentuser2(scope.row,item.value)">{{item.showlist}}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="账号/余额(¥)" width="110">
				<template slot-scope="scope">
					<div class="flexcenter" v-if="scope.row.rent!=0">
						<p style="margin-left: 10px" :class="{islosem:scope.row.rent<0}">{{ scope.row.rent }}</p>
						<el-dropdown>
							<span class="el-dropdown-link cursorp">
								充值
								<i class="el-icon-caret-bottom el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="paym(scope.row)">充值</el-dropdown-item>
								<el-dropdown-item @click.native="callmo()">催交</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

				</template>
			</el-table-column>
		</el-table>
		<!-- 租户详情信息清单 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="65%" :before-close="handleClose" class="">
			<div></div>
			<div class="flexc rgbc">
				<div class="setborder">
					<div class="flexdirection botborder">
						<img src="" alt="" style="width:100px;height:100px;">
						<p>{{updateData.user.name}}</p>
						<p>{{updateData.user.mobile}}</p>
					</div>
					<div class="userinfobot">
						<div>
							<p>姓名</p>
							<p>{{updateData.user.name}}</p>
						</div>
						<div>
							<p>性别</p>
							<p>{{updateData.user.gender}}</p>
						</div>
						<div>
							<p>身份证号</p>
							<p>{{updateData.user.documentId}}</p>
						</div>
						<div>
							<p>手机号</p>
							<p>{{updateData.user.mobile}}</p>
						</div>
						<div class="others"></div>
					</div>
				</div>
				<div style="width:100%;margin-left:30px;">
					<div class="flexc dialog" style="color:#aaa">
						<div @click="changeuserinfo(1)" class="cursorp" :class="{activerent:showinf==1}">租户详情</div>
						<div @click="changeuserinfo(2)" class="cursorp" :class="{activerent:showinf==2}">租约信息</div>
						<div class="menu-right">
							<div class="flexcenter">
								<span @click="changeuserinfo(3)" class="cursorp" :class="{activerent:showinf==3}">费用清单</span>
								<div v-if="showinf==3" class="flexc menu-rightthree cursorpoin">
									<div @click="changeuseri(1)" :class="{activerent:showmoney==1}">仪表代扣</div>
									<div @click="changeuseri(2)" :class="{activerent:showmoney==2}">租约扣费</div>
									<div @click="changeuseri(3)" :class="{activerent:showmoney==3}">充值扣费</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="showinf==1" class="triangle cursorfir">基本信息</div>
					<div v-if="showinf==2" class="triangle cursorsec">合同信息</div>
					<div v-if="showinf==3" class="triangle cursorthi">账单信息</div>
					<Rentinfo v-if="showinf==1" :form="updateData" />
					<Rentmessasge v-if="showinf==2" :form="updateData"/>
					<Rentmoney v-if="showinf==3&&showmoney==1" :form="updateData"/>
					<Rentlease v-if="showinf==3&&showmoney==2" :form="updateData"/>
					<Rentsendmoney v-if="showinf==3&&showmoney==3" :form="updateData"/>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false;showinf=showmoney=1" type="primary">确定</el-button>
			</span>
		</el-dialog>
		<!-- 用户信息预览 -->
		<el-dialog :title="dialogTitle3" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
			<Showrent/>
			<div style="height:30px">
				<el-button type="primary" @click="dialogVisible3 = false" style="float:right;margin-top:10px">确 定</el-button>
			</div>
		</el-dialog>
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
		Paym
	} from '../userinfo';
	export default {
		components: {
			Rentinfo,
			Rentlease,
			Rentmessasge,
			Rentmoney,
			Rentsendmoney,
			Relet,
			Showrent,
			Paym
		},
		data() {
			return {
				updateData: {},
				dialogVisible: false,
				dialogTitle: '详细信息',
				dialogVisible2: false,
				dialogTitle2: '用户续租',
				dialogVisible3: false,
				dialogTitle3: '预览租客合同',
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
						showlist: '预览',
						value: 3
					}
				],
				userinfo: {
					id: 110,
					money: 119,
					name: 'zhangsan',
					sex: '1',
					idcardnum: '8769876987689768796',
					phonenum: 868768768
				},
				tableData: [{
						overdue: '逾期63天',
						date: '2016-05-03',
						name: '郭德纲',
						rent: 0,
						phone: '1300000001',
						rentDesc: '租金6期',
						address: '朝晖三区·2栋2单元201室·B',
						rentdate: '2017-07-01 → 2017-07-31',
						rentalMounthMoney: '2000',
						rentalYear: '2',
						rentcash: '2000',
						rentakMounthpay: '3'
					},
					{
						overdue: '逾期62天',
						date: '2016-05-02',
						name: '老刘',
						rent: -122,
						rentDesc: '押金',
						phone: '1300000002',
						address: '龙湖滟澜山·8栋2单元203室·G',
						rentdate: '2017-08-01 → 2017-08-20',
						rentalMounthMoney: '2000',
						rentalYear: '2',
						rentcash: '2000',
						rentakMounthpay: '3'
					},
					{
						overdue: '逾期61天',
						date: '2016-05-04',
						name: '冰儿',
						rent: 2200,
						rentDesc: '租金11期',
						phone: '1300000003',
						address: '朝晖三区·3栋3单元301室·改哎的名字',
						rentdate: '2017-08-22 → 2017-11-21',
						rentalMounthMoney: '2000',
						rentalYear: '2',
						rentcash: '2000',
						rentakMounthpay: '3'
					},
					{
						overdue: '',
						date: '2016-05-01',
						name: '不是整天 ',
						rent: 200,
						rentDesc: '押金',
						phone: '1300000004',
						address: '保利香槟国际·2栋2单元2室·这个名字很长啊这个字啊这个名字名字很长啊',
						rentdate: '2017-10-12 → 2018-04-11',
						rentalMounthMoney: '2000',
						rentalYear: '2',
						rentcash: '2000',
						rentakMounthpay: '3'
					}
				],
				userdatainfo: {
					"contractId": 1,
					"roomId": 430000,
					"user": {
						"id": 4234948878,
						"accountName": "accountName",
						"name": "username",
						"mobile": "13897656479",
						"documentId": "330109198007085678X",
						"documentType": 1,
						"gender": "M"
					},
					"from": 1510326577,
					"to": 1510326577,
					"strategy": {
						"daily": {
							"rent": 10000
						},
						"monthly": {
							"once": 0,
							"freq": {
								"interval": "1/2/3/6/12",
								"rent": 10000,
								"pattern": "BILL/PREPAY"
							},
							"customer": [{
								"from": 1509976830,
								"to": 1509976830,
								"forFree": "0不免租金/1免租金",
								"rent": 10000,
								"interval": "1/2/3/6/12"
							}]
						}
					},
					"expenses": [{
						"configId": "1/2/3...",
						"rent": 10000,
						"interval": "1/2/3/6/12"
					}],
					"paymentPlan": "F10",
					"signUpTime": 1510326577
				}
			};
		},
		created(){
			this.updateData = this.userdatainfo
		},
		methods: {
			handleClose(done) {
				this.$confirm('Are you sure to close this dialog?')
					.then(() => {
						done();
					})
					.catch(() => {});
			},
			rentuser(index, value, item) {
				this.dialogVisible = true;
				this.showinf = value;
				this.updateData = item;
				this.updateData = this.userdatainfo;
			},
			rentuser2(data, value) {
				var that = this;
				if (value == 1) {
					// 打开续租页面
					this.$modal.$emit('open', {
						comp: Relet,
						data: {
							item: this.userdatainfo
						},
						title: '新增房源'
					});

				} else if (value == 2) {
					// 删除租户
					this.$confirm('此操作将删除该租户, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					this.dialogVisible3 = true;
				}
			},
			changeuserinfo(data) {
				this.showinf = data;
			},
			changeuseri(data) {
				this.showmoney = data;
			},
			callmo() {
				console.log(1)
				this.$confirm('将要使用短信t通知租户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '提醒成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消提醒'
					});
				});
			},
			// 除了电子支付其余的手段
			paym(date) {
				console.log(1)
				this.$modal.$emit('open', {
					comp: Paym,
					title: '充值'
				})
			}
		}
	};
</script>


<style lang="less" scoped>
	.rent-bottom {
		color: #aaa
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
		flex: 1
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
		}
		.others {
			height: 100px;
		}
	}

	.userinfobot>div:first-child {
		margin-top: 16px;
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
	} // .triangle:nth-child(1):after{
	// 	left:10px;
	// }
	.cursorfir:after {
		left: 14px
	}

	.cursorsec:after {
		left: 120px
	}

	.cursorthi:after {
		left: 226px
	}

	div.activerent,
	span.activerent {
		color: #000
	}

	.islosem {
		color: #F03D53
	}
</style>