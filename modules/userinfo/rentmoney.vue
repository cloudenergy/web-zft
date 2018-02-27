<template>
	<el-table :data="bills" stripe style="width: 100%">
		<el-table-column label="日期" width="130">
			<template slot-scope="scope">
				<span>{{ nowTime(scope.row.createdAt) }}</span>
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
		<el-table-column label="金额">
			<template slot-scope="scope">
				<span>{{ price(scope.row.amount) }}元</span>
			</template>
		</el-table-column>
		<el-table-column prop="scale" label="读数">
		</el-table-column>
		<el-table-column prop="usage" label="用量">
		</el-table-column>
	</el-table>
</template>

<script>
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
				return data / 100
			},
			nowTime(data) {
				console.log(data,new Date(parseInt(data) * 1000).toLocaleDateString())
				return new Date(parseInt(data) * 1000).toLocaleDateString().replace(/年|月/g, "-")
			}
		}
	}
</script>