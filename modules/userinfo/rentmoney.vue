<template>
<div>
	<el-table :data="bills" stripe style="width: 100%">
		<el-table-column label="日期" width="150">
			<template slot-scope="scope">
				<span>{{ date(scope.row.paymentDay) }}</span>
			</template>
		</el-table-column>
		<el-table-column label="类型" width="130">
			<template slot-scope="scope">
				<span>{{categoryName(scope.row)}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="scale" label="扣费类型">
			<template slot-scope="scope">
				<span>{{ scope.row.configName }}</span>
			</template>
		</el-table-column>
		<el-table-column label="消费金额">
			<template slot-scope="scope">
				<span class="red">{{ price(scope.row.amount) }}</span>
			</template>
		</el-table-column>

		<el-table-column prop="usage" label="剩余金额">
			<template slot-scope="scope">
				<span :class="colorOf(scope.row.balance)">{{ price(scope.row.balance) }}</span>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination background layout="prev, pager, next" :total='paging.count' @current-change="handleCurrentChange" style="margin-top:5px;text-align:right"
        :page-size='paging.size'>
    </el-pagination>
</div>

</template>

<script>
	import format from 'date-fns/format'
	export default {
		props: {
			form: {
				required: true
			}
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			}
		},
		data() {
			return {
				bills: [],
				paging:{},
				reqData:{
					mode:'prepaid',
					index:1,
					size:15
				}
			}
		},
		mounted() {
			this.query();
		},
		methods: {
			refresh() {
				this.$set(this, 'bills', []);
				this.query();
			},
			handleCurrentChange( val ) {
				this.reqData.index = val
				this.query()
			},
			query() {
				this.$model('paid_bills')
					.query(this.reqData, {
						projectId: this.projectId,
						contractId: this.form.id
					})
					.then(res => {
						this.$set(this, 'bills', res.data || []);
						this.$set(this, 'paging', res.paging || []);
					})
			},
			dosage(val) {
				return (val/10000).toFixed(2)
			},
			date(val) {
				return format(new Date(val*1000),'YYYY-MM-DD  HH:mm:ss')
			},
			price(data) {
				return (data / 100).toFixed(2)
			},
			colorOf(balance) {
				return balance < 0 ? 'red' : 'black';
			},
			categoryName(row) {
				if(row.type === 'ELECTRICITY') {
					return row.share ? '公摊电费' : '个人电费';
				}
				return '每日预付费'
			}
		},
		watch: {
			form (newVal, oldVal) {
				if(newVal.id !== oldVal.id) {
					this.refresh();
				}
			}
		}
	}
</script>

<style scoped lang="less">

	.red {
		color: #F03D53;
	}
	.black {
		color: #303133;
	}
</style>
