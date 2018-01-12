<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="houseFormat"/>
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<BillStatus class="status"/>
					<BillMode class="bill-mode"/>
					<BillType class="bill-type"/>
					<ReportPeriod class="period"/>
					<BillManager class="manager"/>
					<BillSearch class="bill-search"/>
					<span class="result-info">32项结果</span>
					<div class="actions">
						<el-button type="warning" size="mini">
							导出
							<i class="el-icon-sort"></i>
						</el-button>
					</div>
				</div>
			</el-header>
			<el-main>
				<div class="result">
					<DataTable :tableBill='tableBill' :pagingSize="pagingSize"/>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {Tab} from '~/modules/house';
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
				tableData:[],
				pagingSize:{},
				houseFormat: 'SHARE',
			};
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId
			},
			tableBill() {
				return this.tableData.map((list,index)=>{
					list.dueDateTime = new Date(parseInt(list.dueDate) * 1000).toLocaleDateString().replace(/\//g, "-")
					list.endDateTime = new Date(parseInt(list.endDate) * 1000).toLocaleDateString().replace(/\//g, "-")
					list.startDateTime = new Date(parseInt(list.startDate) * 1000).toLocaleDateString().replace(/\//g, "-")
					return list
				})
			}	
		},
		created () {
			this.query()	
		},
		methods: {
			query(){
				this.$model('all_user_bills')
					.query({
						houseFormat: this.houseFormat,
						size:15,
						index:1
						},{projectId:this.projectId})
					.then(res=>{
						this.$set(this,'tableData',res.data)
						this.$set(this,'pagingSize',res.paging)
					})
					.catch(err=>{
						console.log(err)
					})
				},
			refresh(type) {
				this.houseFormat = type;
				this.query()
			}	
		}
	};
</script>

<style lang="less" scoped>
	.page-bill-index {
		display: flex;
		// min-width: 275px;
	}

	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result {
		display: block;
		&:before {
			clear: both;
		}
	}

	.actions {
		// margin-top: 10px;
		margin-left: 10px;
	}

	.el-select.select{
		margin-top: 0;
	}
</style>
