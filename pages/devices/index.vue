<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="houseFormat" />
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto;padding-right:0">
				<div class="ops-bills">
					<div class="flexcenter">
						<div style="margin-left:-20px">
							<RentSearch @childinfo="showmessage" />
						</div>
					</div>
					<div class="flexcenter">
						<span class="result-info">{{paging.count}}项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>
				</div>
			</el-header>
			<el-main style="padding-right:0">
				<electricit :houses="houses" />
				<!-- <div id="myChart" :style="{width: '1000px', height: '500px'}"></div> -->
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		deviceModules,
		electricit,
	} from '../../modules/devices'
	import {
		RentSearch
	} from '../../modules/rent'
	export default {
		components: {
			Tab,
			deviceModules,
			RentSearch,
			electricit
		},
		data() {
			return {
				houseFormat: 'SHARE',
				houses: [],
				paging: {},
				reqData: {
					size: 20,
					index: 1
				}
			};
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			}
		},
		mounted() {
			// this.drawLine();
		},
		methods: {
			// drawLine() {
			// 	// 基于准备好的dom，初始化echarts实例
			// 	let myChart = this.$echarts.init(document.getElementById('myChart'))
			// 	// 绘制图表
			// 	myChart.setOption({
			// 		title: {
			// 			text: '未来一周气温变化',
			// 			subtext: '纯属虚构'
			// 		},
			// 		tooltip: {
			// 			trigger: 'axis'
			// 		},
			// 		legend: {
			// 			data: ['最高气温', '最低气温']
			// 		},
			// 		toolbox: {
			// 			show: true,
			// 			feature: {
			// 				mark: {
			// 					show: true
			// 				},
			// 				dataView: {
			// 					show: true,
			// 					readOnly: false
			// 				},
			// 				magicType: {
			// 					show: true,
			// 					type: ['line', 'bar']
			// 				},
			// 				restore: {
			// 					show: true
			// 				},
			// 				saveAsImage: {
			// 					show: true
			// 				}
			// 			}
			// 		},
			// 		calculable: true,
			// 		xAxis: [{
			// 			type: 'category',
			// 			boundaryGap: false,
			// 			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			// 		}],
			// 		yAxis: [{
			// 			type: 'value',
			// 			axisLabel: {
			// 				formatter: '{value} °C'
			// 			}
			// 		}],
			// 		series: [{
			// 			name: '最高气温',
			// 			type: 'line',
			// 			data: [11, 11, 15, 13, 12, 13, 10],
			// 			markPoint: {
			// 				data: [{
			// 						type: 'max',
			// 						name: '最大值'
			// 					},
			// 					{
			// 						type: 'min',
			// 						name: '最小值'
			// 					}
			// 				]
			// 			},
			// 			markLine: {
			// 				data: [{
			// 					type: 'average',
			// 					name: '平均值'
			// 				}]
			// 			}
			// 		}]
			// 	});
			// },
			refresh(type, commiunityId) {
				this.reqData.houseFormat = type
				if (commiunityId !== undefined) {
					this.reqData.locationId = commiunityId
				} else {
					delete this.reqData.locationId
				}
				this.query();
			},
			query() {
				this.$model('houses')
					.query({
						houseFormat: this.houseFormat
					}, {
						projectId: this.projectId
					})
					.then(res => {
						this.$set(this, 'houses', res.data || []);
						this.$set(this, 'paging', res.paging || []);
					});
			},
			showmessage(data) {
				console.log(data)
			}
		}
	};
</script>
<style lang="less" scoped>
	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result-info {
		margin-right: 5px;
	}
</style>