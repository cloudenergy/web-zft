<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="houseFormat" @communityChange='communityChange'/>
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
				<electricit :readingElectric="readingElectric" :houseFormat="houseFormat"/>
				<el-pagination :background="background" layout="prev, pager, next" :total='paging.count' @current-change="handleCurrentChange"
				style="margin-top:5px;text-align:right" :page-size='20'>
			</el-pagination>
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
	import startOfYesterday from 'date-fns/start_of_yesterday'
	export default {
		components: {
			Tab,
			deviceModules,
			RentSearch,
			electricit
		},
		data() {
			return {
				background:true,
				houseFormat: 'SHARE',
				readingElectric: [],
				paging: {},
				reqData: {
					houseFormat:this.houseFormat,
					startDate:1506787200,
					endDate:1512057600,
					size:20,
					index:1
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
			handleCurrentChange(val) {
				this.reqData.index = val;
				this.query()
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
			refresh(type, commiunityId) {
				this.reqData.houseFormat = type
				if (commiunityId !== undefined) {
					this.reqData.locationId = commiunityId
				} else {
					delete this.reqData.locationId
				}
				console.log(type,commiunityId)
				this.query();
			},
			query() {
				this.$model('reading_equipment')
					.query(this.reqData, {
						projectId: this.projectId
					})
					.then(res => {
						res.data.map(ele=>{
							ele.startDate = Date.parse(startOfYesterday())
							ele.endDate = Date.parse(new Date())
							return ele
						})
						this.$set(this, 'readingElectric', res.data || []);
						this.$set(this, 'paging', res.paging || []);
						// this.$set(this, 'paging', res.paging || []);
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