<template>
	<el-table :data="billItem" stripe :row-key="getRowKeys" :expand-row-keys="expands"      @row-click='handleRowHandle'    ref="tableData"
	    style="width:100%">
		<el-table-column type="expand">
			<template slot-scope="props">
				<div class="hideMenu">
					<div style="vertical-align:top">
						账单明细
					</div>
					<div>
						<div v-for="item in props.row.billItems" :key="item.id" class="setinline">
							<span v-for="(list,index) in otherCost" :key="index" v-if="list.id===item.configId">{{list.key}}</span>
							<span v-if="item.configId===121">租金</span>
							<span v-if="item.configId===123">押金</span>
							<div>{{price(item.amount)}}</div>
							<div>{{item.createdAtTime}}</div>
						</div>
					</div>
				</div>
				<div class="hideMenu">
					<div style="vertical-align:top">
						支付时间
					</div>
					<div>
						<div v-for="item in props.row.fundChannelFlows" :key="item.amount" class="setinline">
							<div>{{date(item.createdAt)}}</div>
						</div>
					</div>
				</div>
			</template>
		</el-table-column>
		<el-table-column prop="type" label="类型" width="80">
			<template slot-scope="scope">
				<span v-for="(item,index) in costType" :key="index" v-if="item.type===scope.row.type">{{item.value}}</span>
			</template>
		</el-table-column>
		<el-table-column label="账期" width="200">
			<template slot-scope="scope">
				<span>{{scope.row.startDateNew}}</span>至
				<span>{{scope.row.endDateNew}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="dueAmount" label="金额￥" width="80">
			<template slot-scope="scope">
				<span>{{price(scope.row.dueAmount)}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="dueDateNew" label="应付日期">
		</el-table-column>
		<el-table-column label="状态" width="120">
			<template slot-scope="scope">
				<span v-if="scope.row.fundChannelFlows.length!==0">已支付</span>
				<span v-if="scope.row.fundChannelFlows.length===0">未支付</span>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import format from 'date-fns/format'
	export default {
		props: {
			form: {
				type: Array
			}
		},
		computed: {
			billItem: function () {
				return this.form.map(function (item) {
					item.startDateNew = new Date(parseInt(item.startDate) * 1000).toLocaleDateString().replace(/年|月/g, '-')
					item.endDateNew = new Date(parseInt(item.endDate) * 1000).toLocaleDateString().replace(/年|月/g, '-')
					item.dueDateNew = new Date(parseInt(item.dueDate) * 1000).toLocaleDateString().replace(/年|月/g, '-')
					item.createdAtNew = new Date(parseInt(item.createdAt) * 1000).toLocaleDateString().replace(/年|月/g, '-')
					item.billItems.map(function (newitem) {
						newitem.createdAtTime = new Date(parseInt(newitem.createdAt) * 1000).toLocaleDateString().replace(
							/年|月/g, '-')
						return newitem
					})
					return item
				})
			}
		},
		created() {
			this.$store
				.dispatch('GET_OTHERCOST')
				.then(data => (this.otherCost = data));
		},
		data() {
			return {
				getRowKeys(row) {
					return row.id;
				},
				costType: [{
						type: 'rent',
						value: '租金'
					},
					{
						type: 'extra',
						value: '加收'
					},
					{
						type: 'bond',
						value: '押金'
					}
				],
				expands: [],
				otherCost: [],

			}
		},
		methods: {
			date(val) {
				return format(new Date(val*1000),'YYYY-MM-DD  HH:mm:ss')
			},
			// 展开方法参考https://segmentfault.com/q/1010000007828282
			// quantumlist.vue里也有使用，也可以参考
			handleRowHandle(row) {              
				this.toggle(row.id)
			},
			toggle(flowi) {
				this.$refs.tableData.toggleRowExpansion(this.form.find(d => d.id == flowi))
			},
			set(time) {
				return new Date(parseInt(time) * 1000).toLocaleDateString().replace(/\//g, "-")
			},
			price(data) {
				return (data / 100).toFixed(2)
			}
		}
	}
</script>

<style lang="less" scoped>
	.hideMenu:nth-child(1) {
		border-bottom: 1px solid #aaa
	}

	.hideMenu>div {
		display: inline-block;
	}

	.hideMenu>div:nth-child(1) {
		min-width: 80px;
	}

	.hideMenu>div:nth-child(2) {
		border-left: 1px solid #aaa
	}

	.setinline {
		span {
			margin-left: 10px;
			width: 187px;
			display: inline-block
		}
	}

	.setinline>div {
		display: inline-block;
		padding: 0 10px;

		&:nth-child(1) {
			width: 200px;

		}
		&:nth-child(2) {
			width: 80px;
		}
	}
</style>