<template>
	<el-container>
		<el-aside class="page-bill-index">
			<div>
				<Tab/>
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<BillStatus class="status"/>
					<BillType class="bill-type"/>
					<ReportPeriod class="period"/>
					<BillManager class="manager"/>
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
					<DataTable/>
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
		BillManager
	} from '~/modules/bill';

	export default {
		components: {
			Tab,
			BillStatus,
			BillType,
			ReportPeriod,
			BillManager,
			DataTable
		},
		data() {
			return {
				input: ''
			};
		}
	};
</script>

<style lang="less" scoped>
	.page-bill-index {
		display: flex;
		min-width: 275px;
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
