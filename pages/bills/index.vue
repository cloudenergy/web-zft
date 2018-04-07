<template>
	<el-container class="bill">
		<div>
			<Tab @change="refresh" :selected="reqData.houseFormat" @communityChange="communityChange"/>
		</div>
		<el-container>
			<el-header style="height:auto;padding-right:0" class="billSearch">
				<div class="ops-bills">
					<div class="flexcenter" style="width:540px">
						<BillStatus class="status" @billStatus="billStatus" />
						<!-- <bill-type/> -->
						<ReportPeriod class="period" @dateChange = "dateChange"/>
						<RentManager class="manager" :houseKeeper='houseKeeper' @managerChoose='managerChoose'/>
					</div>
					<div class="flexcenter">
						<span class="result-info">{{pagingSize.count}}项结果</span>
						<!-- <div class="actions">
							<el-button type="warning" size="mini">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div> -->
					</div>
				</div>
				<search-all :title="'搜索姓名/电话'" @keyup="keyup"></search-all>
			</el-header>
			<div class="result">
				<DataTable :tableBill='tableBill' :pagingSize="pagingSize" @refresh="refreshCost" @sizeIndex="sizeIndex"/>
			</div>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		BillStatus,
		BillType,
		ReportPeriod,
		DataTable,
		BillManager,
		BillMode,
		BillSearch
	} from '~/modules/bill';
	import RentManager from '~/modules/rent/rent-manager.vue';
	import subMonths from 'date-fns/sub_months';
	import getTime from 'date-fns/get_time';
	const nowDate = Date.parse(new Date())/1000
	export default {
		components: {
			Tab,
			BillStatus,
			BillType,
			ReportPeriod,
			BillManager,
			DataTable,
			BillMode,
			BillSearch,
			RentManager
		},
		data() {
			return {
				input: '',
				tableData: [],
				pagingSize: {},
				reqData:{
					houseFormat: 'SHARE',
					paid: false,
					size:20,
					index:1
				},
				houseKeeper:null
			};
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			},
			tableBill() {
				return this.tableData.map((list, index) => {
					list.dueDateTime = new Date(parseInt(list.dueDate) * 1000).toLocaleDateString().replace(/\//g, "-")
					list.endDateTime = new Date(parseInt(list.endDate) * 1000).toLocaleDateString().replace(/\//g, "-")
					list.startDateTime = new Date(parseInt(list.startDate) * 1000).toLocaleDateString().replace(/\//g, "-")
					return list
				})
			}
		},
		created() {
			// this.query();
    	},
		methods: {
			// 搜索
			keyup(val) {
				this.setSearch(val)
			},
			// 管理员
			managerChoose(val) {
				this.reqData.manager = val
				this.query()
			},
			dateChange(val) {
				if(val==='all') {
					this.reqData.from = Date.parse(subMonths(nowDate*1000, 12))/1000
					this.reqData.to = nowDate
					this.query()
				}else {
					this.reqData.from = Date.parse(subMonths(nowDate*1000, val))/1000
					this.reqData.to = nowDate
					this.query()
				}
			},
			communityChange(data) {
				if(data==='0'){
					delete this.reqData.locationId
					this.query()
				}else{
					this.reqData.locationId = data
					this.query()
				}
			},
			setSearch(data) {
				if(/bills/.test(location.pathname)){
					if(data!==''){
						this.reqData.q=data
					}
					else{
						delete this.reqData.q
					}
					this.query()
				}
			},
			query() {
				this.$model('all_user_bills')
				.query(this.reqData, {
					projectId: this.projectId
				})
				.then(res => {
					this.$set(this, 'tableData', res.data)
					this.$set(this, 'pagingSize', res.paging)
				})
				.catch(err => {
					console.log(err)
				})
				this.$store.dispatch('HOUSE_KEERER',{
					projectId:this.projectId
				}).then(data=>{
					this.$set(this,'houseKeeper',data)
				})
			},
			refresh(type,commiunityId) {
				this.reqData.houseFormat = type
				if(commiunityId!==undefined){
					this.reqData.locationId = commiunityId
				}else{
					delete this.reqData.locationId
				}
				this.query();
			},
			billStatus(type) {
				this.reqData.paid = type
				this.query()
			},
			refreshCost() {
				this.query()
			},
			sizeIndex(data) {
				this.reqData.index = data
				this.query()
			}
		}
	};
</script>

<style lang="less" scoped>
	.bill .billSearch {
		padding-left: 10px;
	}
	.page-bill-index {
		display: flex; // min-width: 275px;
	}

	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result {
		margin-left: 10px;
		display: block;
		&:before {
			clear: both;
		}
	}

	.actions {
		// margin-top: 10px;
		margin-left: 10px;
	}

	.el-select.select {
		margin-top: 0;
		margin-left: 10px;
	}
</style>