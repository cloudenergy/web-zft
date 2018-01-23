<template>
	<div id="rentinfo">
		<el-table :data="housesRent" style="width: 100%">
			<el-table-column label="姓名" width="120">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<span size="medium" @click="rentuser('1',scope.row)" class="cursorp">{{ scope.row.user.name }}
							<el-popover trigger="hover" placement="top">
								<p v-if="scope.row.user.mobile!=''">{{ scope.row.user.mobile }}</p>
								<p v-if="scope.row.user.mobile==''">暂无信息</p>
								<span slot="reference" class="name-wrapper">
									<i class="el-icon-phone"></i>
								</span>
							</el-popover>
						</span>
						<p style="margin-left: 10px">{{ scope.row.user.accountName }}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="房源/租期" min-width="300" max-width="500">				
				<template slot-scope="scope">
						<div slot="reference" class="name-wrapper cursorp" @click="rentuser('2',scope.row)">
							<div>{{ scope.row.room.locationName }}{{ scope.row.room.building }}{{ scope.row.room.unit }}{{ scope.row.room.roomNumber }}{{ scope.row.room.roomName }}</div>
							<div class="rent-bottom">
								<span>{{ scope.row.fromDate }}&nbsp;&nbsp;至&nbsp;&nbsp;{{ scope.row.toDate }}</span>
							</div>
						</div>
				</template>
			</el-table-column>
			<el-table-column label="租金" min-width="290">
				<template slot-scope="scope">
					<div class="flexcenter">
						<div class="name-wrapper">
							<span>￥{{ scope.row.strategy.freq.rentprice }}元/月&nbsp;×&nbsp;</span>
							<span>{{ scope.row.allM }}</span>
							<div class="rent-bottom">
								<span>￥{{ scope.row.strategy.bondprice }}/押</span>
								<span v-if="scope.row.strategy.freq.pattern==1">&nbsp;&nbsp;一月一付</span>
								<span v-if="scope.row.strategy.freq.pattern==2">&nbsp;&nbsp;二月一付</span>
								<span v-if="scope.row.strategy.freq.pattern==3">&nbsp;&nbsp;三月一付</span>
								<span v-if="scope.row.strategy.freq.pattern==6">&nbsp;&nbsp;半年一付</span>
								<span v-if="scope.row.strategy.freq.pattern==12">&nbsp;&nbsp;一年一付</span>
								<span v-if="scope.row.strategy.freq.pattern=='paidOff'">&nbsp;&nbsp;一次付清</span>
								<span v-if="scope.row.strategy.freq.pattern=='prepaid'">预付费</span>
								<span v-if="scope.row.strategy.freq.pattern=='withRent'">&nbsp;&nbsp;随租金付</span>
							</div>
						</div>
						<div class="rentMoneyshow">
							<el-dropdown>
								<span class="el-dropdown-link cursorp">
									查看
									<i class="el-icon-caret-bottom el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="item in list1" :key="item.value" @click.native="rentuser(item.value,scope.row)">{{item.showlist}}</el-dropdown-item>
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
			<el-table-column label="余额(¥)" width="130">
				<template slot-scope="scope">
					<div class="flexcenter">
						<span class="userCashAmount" style="color:#F03D53" v-if="scope.row.user.cashAccount.balance<20">{{scope.row.user.cashAccount.balance}}</span>
						<span class="userCashAmount" v-if="scope.row.user.cashAccount.balance>=20">{{scope.row.user.cashAccount.balance}}</span>
						<el-dropdown>
							<span class="el-dropdown-link cursorp">
								充值
								<i class="el-icon-caret-bottom el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="paym(scope.row)">充值</el-dropdown-item>
								<el-dropdown-item @click.native="callMobilebile()">催交</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

				</template>
			</el-table-column>
		</el-table>
		<!-- 租户详情信息清单 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="65%" class="">
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
							<p v-if="updateData.user.name==''">暂无信息</p>
						</div>
						<div>
							<p>性别</p>
							<p v-if="updateData.user.gender=='M'">男</p>
							<p v-if="updateData.user.gender=='F'">女</p>
							<p v-if="updateData.user.gender==''">暂无信息</p>
						</div>
						<div>
							<p>身份证号</p>
							<p>{{updateData.user.documentId}}</p>
							<p v-if="updateData.user.documentId==''">暂无信息</p>
						</div>
						<div>
							<p>手机号</p>
							<p>{{updateData.user.mobile}}</p>
							<p v-if="updateData.user.mobile==''">暂无信息</p>
						</div>
						<div class="others"></div>
					</div>
				</div>
				<div style="width:100%;margin-left:30px;">
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
					<Rentmessasge v-if="showinf==2" :form="updateData"/>
					<Rentmoney v-if="showinf==3&&showmoney==1" :form="updateData"/>
					<Rentlease v-if="showinf==3&&showmoney==2" :form="contractbill"/>
					<Rentsendmoney v-if="showinf==3&&showmoney==3" :form="updateData"/>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false;showinf=showmoney=1" type="primary">确定</el-button>
			</span>
		</el-dialog>
		<!-- 用户信息预览 -->
		<el-dialog :title="dialogTitle3" :visible.sync="dialogVisible3" width="50%">
			<Rentmessasge :form="updateData"/>
			<div style="height:30px">
				<el-button type="primary" @click="dialogVisible3 = false" style="float:right;margin-top:10px">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog :title="dialogTitle4" :visible.sync="dialogVisible4" width="50%">
			<RentWithout :id="updateData.id" ref="operate"/>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible4 = false">取 消</el-button>
				<el-button type="primary" @click="operateRent">确 定</el-button>
			</span>
		</el-dialog>
		<el-pagination
                :background="background"
                layout="prev, pager, next"
                :total='housesrentData.paging.count'
                @current-change="handleCurrentChange"
                style="margin-top:5px;text-align:right"
                :page-size='12'>
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
			RentWithout
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			},
			housesRent() {
				return this.housesrentData.data
			}
		},
		props: {
    		housesrentData: {
    			required: true
    		}
    	},
		data() {
			return {
				background:true,
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
					},
					{
						showlist: '预览',
						value: 3
					}
				],
				userdatainfo: {
					"contractId": 1,
					"roomId": 430000,
					"user": {
						"id": 111111111,
						"accountName": "accountName",
						"name": "username",
						"mobile": "111111111111",
						"documentId": "11111111111",
						"documentType": 1,
						"gender": "M"
					}
				}
			};
		},
		created(){
			this.updateData = this.userdatainfo;
			this.$modal.$on('refresh', () => this.$emit('refresh'));
		},
		methods: {
			rentuser( value, item) {
				this.updateData.user = item.user;
				this.$model('contracts_info')
				.query({},{projectId: this.projectId,contractId:item.id})
				.then(res=>{
					this.updateData = res;
				})
				.catch(err=>{
					console.log(err)
				})
				this.$model('contract_bill')
				.query({},{projectId: this.projectId,id:item.id})
				.then(data=> this.$set(this,'contractbill',data))
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
							contractsId:data.id
						},
						title: '续租'
					});

				} else if (value == 2) {
					// 删除租户
					this.$confirm('此操作将删除该租户, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						console.log(this.projectId)
						console.log(data.id)
						this.$model('contracts')
						.delete({},{projectId: this.projectId,id:data.id})
						.then(data=> {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.$emit('refresh')
						})
					}).catch(err => {
						this.mistake('取消删除')
					});
				} else if(value == 4){
					this.dialogVisible4 = true
				}else {
					this.dialogVisible3 = true;
				}
			},
			operateRent(){
				this.$refs.operate.operateRent()
				this.dialogVisible4 = false
			},
			changeUserInfo(data) {
				this.showinf = data;
			},
			rentPay(datanum) {
				this.showmoney = datanum;
			},
			callMobilebile() {
				console.log(1)
				this.$confirm('将要发送催缴通知，是否继续？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '提醒成功!'
					});
				}).catch(err => {
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
					data:{
						userInfo:date
					},
					title: '充值'
				})
			},
			successRefresh() {
				this.$emit('refresh')
			},
			mistake(data){
				this.$message({
						type: 'info',
						message: data
					});
			},
			handleCurrentChange(){
				
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
	.userinfobot{
		margin-left: 5px;
		color:#888;
		>div:first-child{
			margin-top: 16px;
		}
		>div>p:nth-child(1){
			color:#000;
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
	.userCashAmount{
		display: inline-block;
		width: 34px;
		text-align: center;
	}
</style>