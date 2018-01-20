<template>
    <div class="house-cell" :class="{leased: classOut}">
        <div class="cell" @click="view()">
            <h3>{{room.name}}</h3>
            <p>{{room.name}} {{room.area}} {{room.orientation | orientation}}</p>
            <p v-if="room.contract.rent!==undefined">￥{{rentSmall}}/月</p>
            <p v-if="room.contract.rent===undefined">未出租</p>
            <p class="rentee"  v-if="room.contract.rent!==undefined">
                <span>
                    <icon type="yuangong" />{{room.contract.name}}</span>
                <span>退: {{timeDate(room.contract.to)}}</span>
            </p>
        </div>
        <div class="actions cursorp">
            <el-tooltip content="房源预览" placement="top">
                <p @click="view()">
                    <i class="el-icon-view"  style="margin:0 5px;"/>
                </p>
            </el-tooltip>
            <el-tooltip content="合同列表" placement="top">
                <p @click="viewContracts()">
                    <icon type="touxiang1"  style="margin:0 5px;"/>
                </p>
            </el-tooltip>
            <el-tooltip content="添加合同" placement="top">
                <p @click="addContracts()">
                    <icon type="shebeiguanli4"  style="margin:0 5px;"/>
                </p>
            </el-tooltip>
            
                <p class="moreSet">
					<span class="el-dropdown-link">
						<icon type="gengduo1"  style="margin:0 5px;"/>
					</span>
					<ul>
						<li v-if="room.status==='INUSE'" @click="without()">退租</li>
						<li v-if="room.status==='INUSE'" @click="renewal()">续租</li>
						<li v-if="room.status==='INUSE'" @click="deleteContracts(room.contract)">删除合同</li>
						<li @click="deleteRoom()">删除房间</li>
						<li>编辑房间</li>
						<li @click="closeRoom()">关闭房间</li>
					</ul>
                </p>
        </div>
		<el-dialog title="合同列表" :visible.sync="visibility" width="600px">
			<ContractsList :item="roomAllContracts" style="min-height:72px" v-loading="loading" @click.native="showUserInfo(room.contract)" class="cursorp"/>
		</el-dialog>
		<el-dialog title="退租结算" :visible.sync="dialogVisibleWithout" width="50%">
			<RentWithout :id="room.contract.id" ref="operate" @successInfo='successInfo'/>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleWithout = false">取 消</el-button>
				<el-button type="primary" @click="operateRent">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="详情信息" :visible.sync="dialogVisible" width="65%" class="">
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
    </div>
</template>

<script>
    import AddModal from './add';
	import { NewContract } from '~/modules/contract';
	import ContractsList from './contractsList'
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
    const orientations = {
    	N: '北',
    	S: '南',
    	E: '东',
    	W: '西'
    };

    export default {
    	props: {
    		room: Object,
    		house: Object
		},
		components: {
			ContractsList,
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
    	filters: {
    		orientation(val) {
    			return orientations[val] || '';
    		}
		},
		computed: {
			classOut() {
				return this.room.status==='IDLE'
			},
			rentSmall() {
				return this.room.contract.rent/100
			},
			projectId() {
				return this.$store.state.user.projectId
			}
		},
		created(){
			this.updateData = this.userdatainfo;
		},
    	data() {
    		return {
				roomAllContracts:[],
				visibility:false,
				loading: true,
				dialogVisibleWithout:false,
				dialogVisible:false,
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
				},
				updateData:{},
				showinf:1,
				contractbill: '',
				showmoney:1
    		};
    	},
    	methods: {
			successInfo() {
				console.log('room.vue')
				this.$emit('successRefresh')
			},
			rentPay(datanum) {
				this.showmoney = datanum;
			},
			changeUserInfo(data) {
				this.showinf = data;
			},
			timeDate(data){
				return new Date(parseInt(data) * 1000).toLocaleDateString().replace(/年|月/g, "-")
			},
    		edit() {
    			// 编辑窗口
    			this.$modal.$emit('open', {
    				comp: AddModal,
    				data: {
    					item: {
    						...this.room
    					}
    				},
    				title: '房源信息'
    			});
    		},
    		view() {
    			this.$emit('view', { room: this.room, house: this.house });
    		},
    		addContracts() {
    			this.$modal.$emit('open', {
    				comp: NewContract,
    				data: {
    					itemRoom: this.room,
    					itemHouse: this.house
    				},
    				title: '新增合约'
    			});
			},
			viewContracts(){
				if(this.classOut){
					this.$message('暂无合约')
				}else{
					this.$model('room_contracts')
					.query({},{projectId:this.projectId,roomId:this.room.id})
					.then(res=>{
						this.$set(this,'roomAllContracts',res.data)
					})
					.catch(err=>{
						consosle.log(err)
					})
					this.visibility = true
					this.loading = false
				}
				
			},
			deleteRoom(){
				this.$confirm('此操作将删除此房间, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.$model('delete_room')
						.delete({},{projectId:this.projectId,houseId:this.house.houseId,id:this.room.id})
						.then(res=>{
							this.$message.success('删除成功!');
							this.$emit('successRefresh')
						})
						.catch(err=>{
							this.$message('删除失败')
						})
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			// 退租
			without(){
				this.dialogVisibleWithout = true
			},
			// 续租
			renewal(){
				this.$modal.$emit('open', {
					comp: Relet,
					data: {
						contractsId:this.room.contract.id
					},
					title: '续租'
				});
			},
			// 删除合同
			deleteContracts(data){
				this.$confirm('此操作将删除该合同, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$model('contracts')
						.delete({},{projectId: this.projectId,id:data.id})
						.then(data=> {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.$emit('successRefresh')
						})
					}).catch(err => {
						this.mistake('取消删除')
					});
			},
			// 关闭房间
			closeRoom(){

			},
			operateRent(){
				this.$refs.operate.operateRent()
				this.dialogVisibleWithout = false
			},
			showUserInfo(item) {
				this.$model('contracts_info')
				.query({},{projectId: this.projectId,contractId:item.id})
				.then(res=>{
					console.log(res)
					this.updateData = res;
				})
				.catch(err=>{
					console.log(err)
				})
				this.$model('contract_bill')
				.query({},{projectId: this.projectId,id:item.id})
				.then(data=> this.$set(this,'contractbill',data))
				this.dialogVisible = true
			}

    	}
    };
</script>

<style lang="less" scoped>
    .house-cell {
    	position: relative;
    	padding: 10px;
    	width: 240px;
    	height: 116px;
    	border-radius: 4px;
    	border: 1px solid @light;
    	border-left: 4px solid @success;

    	&.leased {
    		border-left-color: rgb(253, 109, 109);
    	}

    	.cell {
    		cursor: pointer;
    		h3 {
    			margin-bottom: 10px;
    			overflow: hidden;
    			white-space: nowrap;
    		}

    		p {
    			margin-top: 10px;
    			color: @gray;
    			overflow: hidden;
    			white-space: nowrap;
    		}

    		.rentee {
    			border-top: 1px solid @light;
    			padding-top: 12px;
    			margin-top: 8px;

    			display: flex;
    			justify-content: space-between;
    		}
    	}

    	.actions {
    		cursor: pointer;
    		position: absolute;
    		bottom: -14px;
    		background: #fff;
    		display: none;
    		text-align: center;
    		border: 1px solid #ddd;
    		border-radius: 2px;
    		right: 10%;
    		margin-left: -36px;
    		p {
    			padding: 5px;
				display: inline-block;
				position: relative;
				ul{
					position: absolute;
					bottom: 21px;
					right:-4px;
					width: 60px;
					background: #fff;
					box-shadow:0 0 1px #CCC;
					display: none;
					overflow: hidden;
					li{
						list-style: none;
						margin:4px 0;
					}
				}
			}
			

    		p + p {
    			border-left: 1px solid #ddd;
			}
			.moreSet:hover ul{
				display: block;	
				li:hover{
					color:#409eff
				}			
			}
    	}

    	&:hover {
    		.actions {
    			display: block;
    		}
    	}
	}
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
	.dialog>div {
		margin-right: 50px;
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
	div.activerent,
	span.activerent {
		color: #000
	}
	.menu-right {
		flex: 1
	}
	.menu-rightthree div {
		margin-left: 15px;
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

</style>
