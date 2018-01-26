<template>
	<el-table :data="tableData" stripe style="width: 100%">
		<el-table-column label="日期" width="130">
			<template slot-scope="scope">
				{{dateTime(scope.row.time)}}
			</template>
		</el-table-column>
		<el-table-column prop="time" label="类型" width="130">
			<template>
				充值
			</template>
		</el-table-column>
		<el-table-column label="金额" color="green">
			<template slot-scope="scope">
				{{price(scope.row.amount)}}
			</template>
		</el-table-column>
		<el-table-column prop="fundChannelName" label="支付方式">
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		computed: {
			projectId() {
				return this.$store.state.user.projectId
			}
		},
		props: {
			form: {
				required: true
			}
		},
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.query()
		},
		methods: {
			dateTime(data) {
				return new Date(parseInt(data) * 1000).toLocaleDateString().replace(/\//g, "-")
			},
			price(data) {
				return data / 100
			},
			query() {
				this.$model('paid_bills')
					.query({
						mode: 'topup',
						index: 1,
						size: 15
					}, {
						projectId: this.projectId,
						contractId: this.form.id
					})
					.then(res => {
						console.log(res)
						this.$set(this, 'tableData', res.data || []);
					})
			}
		}
	}
</script>