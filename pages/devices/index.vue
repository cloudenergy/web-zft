<template>
	<el-container class="devices">
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="houseFormat" @communityChange='communityChange'/>
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto;padding-right:0;padding-left:9px">
				<div class="ops-bills">
					<div class="flexcenter">
						<div style="margin-left:-20px">
						</div>
					</div>
					<div class="flexcenter">
						<span class="result-info">{{paging.count}}项结果</span>
						<div class="actions">
							<!-- <el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button> -->
						</div>
					</div>
				</div>
				<div class="search">
					<search-all :title="'搜索小区/门牌/电话'" @keyup="keyup"></search-all>
				</div>
			</el-header>
			<el-main style="padding:0 0 0 10px">
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
					startDate:startOfYesterday()/1000,
					endDate:Date.parse(new Date)/1000,
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
			keyup(val) {
				this.setSearch(val)
			},
			setSearch(data) {
				if(/rent/.test(location.pathname)){
					if(data!==''){
						this.reqData.q=data
					}
					else{
						delete this.reqData.q
					}
					this.query()
				}
			},
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
				this.query();
			},
			query() {
				this.$model('reading_equipment')
					.query(this.reqData, {
						projectId: this.projectId
					})
					.then(res => {
						res.data.map((ele,index)=>{
							ele.startDate = Date.parse(startOfYesterday())
							ele.endDate = Date.parse(new Date())
							ele.index = `identifyId${index}`
							return ele
						})
						this.$set(this, 'readingElectric', res.data || []);
						this.$set(this, 'paging', res.paging || []);
					});
			},
			showmessage(data) {
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
		line-height: 40px;
	}
	.search {
		margin-top: 14px;
	}
</style>
