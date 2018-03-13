<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<tenant-way class="marsp marspa" style="margin-left:0px" />
				<ofpayments class="marsp marspa" />
				<mounth class="marsp marspa" />
				<water-source class="marsp marspa" />
				<city-area style="width:220px" class="flexce" @cityChange="cityChange" @change="areaChange"/>
				<div class="importres">
					<!-- <div class="actions">
						<el-button type="warning" size="mini">
							导出
							<i class="el-icon-sort"></i>
						</el-button>
					</div> -->
					<span class="result-info">{{monthFlows.length}}项结果</span>
				</div>
			</el-form>
		</div>
		<flowmounthlist :monthFlows="monthFlows" :reqData="reqData"/>
	</div>
</template>
<script>
	import flowmounthlist from './flowmounthlist.vue'
	import mounth from './mounth.vue'
	import ofpayments from './ofpayments.vue'
	import format from 'date-fns/format'
	let nowYear = format(new Date(),'YYYY')
	export default {
		components: {
			flowmounthlist,
			ofpayments,
			mounth
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
					year:nowYear,
					view: 'month'
				},
				monthFlows:[]
			}
		},
		created () {
			this.query()
		},
		methods: {
			cityChange(val) {
				console.log(val)
				this.reqData.districtId = val.city
				this.query()
			},
			areaChange(val) {
				console.log(val)
				this.reqData.districtId = val.area
				this.query()
			},
			query() {
				this.$model('flow_month')
					.query(this.reqData, {
						projectId: this.projectId
					})
					.then(res => {
						console.log(res[0].months['2018-01'])
						this.$set(this, 'monthFlows', res)
					})
					.catch(err => {
						console.log(err)
					})
			}
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