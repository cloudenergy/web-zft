<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<goend @from-toTime='chooseFlowTime'/>
				<water-source class="marsp marspa" @change="waterSource"/>
				<tenant-way class="marsp marspa" @change="houseFormat"/>
				<city-area style="width:220px" class="flexce" @cityChange="cityChange" @change="areaChange" :roadType="flow"/>
				<rent-search @childinfo="childinfo"/>
				<div class="importres">
					<!-- <div class="actions">
						<el-button type="warning" size="mini" @click.native="show()">
							导出
							<i class="el-icon-sort"></i>
						</el-button>
					</div> -->
					<span class="result-info">{{flowPaging.count}}项结果</span>
				</div>
			</el-form>
		</div>
		<quantumlist :mounthFlows='mounthFlows' :flowPaging='flowPaging' @pageIndex="pageIndex" />
	</div>
</template>

<script>
	import {
		RentSearch
	} from '../rent'
	import quantumlist from './quantumlist.vue';
	import goend from './goend.vue';
	import startOfMonth from 'date-fns/start_of_month'
	import endOfDay from 'date-fns/end_of_day'
	let startOfMounth = Date.parse(startOfMonth(new Date()))/1000
	let nowDate = Date.parse(endOfDay(new Date()))/1000
	export default {
		props: {
			flowMounth: {
				type: String
			}
		},
		components: {
			RentSearch,
			quantumlist,
			goend
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			}
		},
		created() {
			this.query()
		},
		data() {
			return {
				formInline: {
					user: '',
					region: '',
					type: '',
					city: '',
					community: ''
				},
				mounthFlows: [],
				flowPaging: '',
				reqData: {
					index: 1,
					size: 20,
					from: startOfMounth,
					to: nowDate
				},
				flow:'flow'
			};
		},
		methods: {
			childinfo(val) {
				if(val!=='') {
					this.reqData.q = val;
				}
				else {
					delete this.reqData.q
				}
				this.query()
			},
			waterSource(val) {
				if(val==='all') {
					delete this.reqData.source
				}else {
					this.reqData.source = val
				}
				this.query()
			},
			houseFormat(val) {
				if(val==='all') {
					delete this.reqData.houseFormat
				}else {
					this.reqData.houseFormat = val
				}
				this.query()
			},
			cityChange(val) {
				this.reqData.districtId = val.city
				this.query()
			},
			areaChange(val) {
				this.reqData.districtId = val.area
				this.query()
			},
			query() {
				this.$model('flow_month')
					.query(this.reqData, {
						projectId: this.projectId
					})
					.then(res => {
						this.$set(this, 'mounthFlows', res.data)
						this.$set(this, 'flowPaging', res.paging)
					})
					.catch(err => {
						console.log(err)
					})
			},
			pageIndex(data) {
				this.reqData.index = data
				this.query()
			},
			chooseFlowTime(data) {
				this.reqData.from=data[0]/1000
				this.reqData.to=data[1]/1000
				this.query()
			}
		}
	};
</script>

<style lang="less" scoped>
	.flexce {
		align-items: center;
	}

	.marsp {
		margin-right: 5px;
	}

	.marspa {
		margin-left: 5px;
	}

	.minisel {
		width: 100px;
	}

	.importres {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}
</style>