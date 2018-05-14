<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<el-button plain type="info">月</el-button>
				<el-button plain type="info">日</el-button>
				<goend style="margin-left:5px"  @from-toTime="fromtoTime"/>
				<tenant-way class="marsp marspa" />
				<ofpayments class="marsp marspa" />
				<water-source class="marsp marspa" />
				<city-area style="width:220px" class="flexce" @cityChange="cityChange" @change="areaChange"/>
				<div class="importres">
					<div class="actions">
					</div>
					<span class="result-info">32项结果</span>
				</div>
			</el-form>
		</div>
		<flowchnnellist :channelFlows="channelFlows"/>
	</div>
</template>
<script>
	import goend from './goend.vue'
	import flowchnnellist from './flowchnnellist.vue'
	import ofpayments from './ofpayments.vue'
	import startOfMonth from 'date-fns/start_of_month'
	import endOfDay from 'date-fns/end_of_day'
	let startOfMounth = Date.parse(startOfMonth(new Date()))/1000
	let nowDate = Date.parse(endOfDay(new Date()))/1000
	export default {
		components: {
			flowchnnellist,
			goend,
			ofpayments
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
					view: 'channel'
				},
				channelFlows:[]
			}
		},
		created() {
			this.query()
		},
		methods: {
			query(){
				this.$model('')
			},	
			cityChange(val) {
				this.reqData.districtId = val.city
				this.query()
			},
			areaChange(val) {
				this.reqData.districtId = val.area
				this.query()
			},
			fromtoTime(data) {
				this.reqData.from = data[0]/1000
				this.reqData.to = data[1]/1000
				this.query()
			},
			query() {
				this.$model('flow_month')
					.query(this.reqData, {
						projectId: this.projectId
					})
					.then(res => {
						this.$set(this, 'channelFlows', res)
					})
					.catch(err => {
					})
			},
		}
	}
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