<template>
	<el-container>
		<div>
			<Tab @change="refresh" :selected="reqData.houseFormat" @communityChange="communityChange"/>
		</div>
		<el-container>
			<el-header style="height:auto;padding-right:0">
				<div class="ops-bills">
					<div class="flexcenter" style="width:735px">
						<BillStatus class="status" @billStatus="billStatus" />
						<bill-type/>
						<ReportPeriod class="period" />
						<room-manager/>
					</div>
					<div class="flexcenter">
						<span class="result-info">32项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>
				</div>
				<search-all :title="'搜索姓名/电话'"></search-all>
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

	export default {
		components: {
			Tab,
			BillStatus,
			BillType,
			ReportPeriod,
			BillManager,
			DataTable,
			BillMode,
			BillSearch
		},
		data() {
			return {
				input: '',
				tableData: [],
				pagingSize: 0,
				reqData:{
					houseFormat: 'SHARE',
					paid: false,
					size:20,
					index:1
				}
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
			this.$modal.$on('keyup',(data)=>{this.setSearch(data)})
    	},
		methods: {
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
						this.$set(this, 'pagingSize', res.paging.count)
					})
					.catch(err => {
						console.log(err)
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
		margin-left: 20px;
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
	}
</style>