<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<goend @from-toTime="fromtoTime"/>
				<tenant-way class="marsp marspa"  @change="houseFormat"/>
				<city-area style="width:220px" class="flexce" @cityChange="cityChange" @change="areaChange"/>
				<div class="importres">
					<div class="actions">
						<!-- <el-button type="warning" size="mini">
							导出
							<i class="el-icon-sort"></i>
						</el-button> -->
					</div>
					<span class="result-info">{{subjectFlows.length}}项结果</span>
				</div>
			</el-form>
		</div>
		<flowsubjectlist :subjectFlows="subjectFlows" :reqData="reqData" :loading="loading"/>
	</div>
</template>
<script>
	import flowsubjectlist from './flowsubjectlist.vue'
	import goend from './goend.vue'
	import startOfMonth from 'date-fns/start_of_month'
	import endOfDay from 'date-fns/end_of_day'
	let startOfMounth = Date.parse(startOfMonth(new Date()))/1000
	let nowDate = Date.parse(endOfDay(new Date()))/1000
	export default {
		components: {
			flowsubjectlist,
			goend,
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			}	
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
				reqData: {
					from: startOfMounth,
					to: nowDate,
					view: 'category'
				},
				subjectFlows:[],
				loading:[]
			}
		},
		created () {
			this.query()
		},
		methods: {
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
						this.$set(this, 'subjectFlows', res)
						this.loading = res.map(ele=>{
							return true
						})
					})
					.catch(err => {
					})
			},
			fromtoTime(data) {
				this.reqData.from = data[0]/1000
				this.reqData.to = data[1]/1000
				this.query()
			}
		}
	}
</script>
<style lang="less" scoped>
	.importres {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.flexce {
		align-items: center;
	}

	.minisel {
		width: 100px;
	}

	.marsp {
		margin-right: 5px;
	}

	.marspa {
		margin-left: 5px;
	}
</style>