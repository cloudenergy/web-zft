<template>
	<el-table :data="bills" stripe style="width: 100%">
		<el-table-column label="日期" width="150">
			<template slot-scope="scope">
				<span>{{ date(scope.row.createdAt) }}</span>
			</template>
		</el-table-column>
		<!-- <el-table-column
      prop="name"
      label="姓名"
      width="130">
    </el-table-column> -->
		<el-table-column label="类型" width="130">
			<template slot-scope="scope">
				<span v-if="scope.row.type==='ELECTRICITY'">电费</span>
			</template>
		</el-table-column>
		<el-table-column label="金额(￥)">
			<template slot-scope="scope">
				<span>{{ price(scope.row.amount) }}</span>
			</template>
		</el-table-column>
		<el-table-column prop="scale" label="读数(Kwh)">
		</el-table-column>
		<el-table-column prop="usage" label="用量(Kwh)">
		</el-table-column>
	</el-table>
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
				bills: []
			}
		},
		created() {
			this.query()
		},
		methods: {
			date(val) {
				return format(new Date(val*1000),'YYYY-MM-DD  HH:mm:ss')
			},
			query() {
				this.$model('paid_bills')
					.query({
						mode: 'prepaid',
						index: 1,
						size: 15
					}, {
						projectId: this.projectId,
						contractId: this.form.id
					})
					.then(res => {
						this.$set(this, 'bills', res.data || []);
					})
			},
			price(data) {
				return (data / 100).toFixed(2)
			}
		}
	}
</script>