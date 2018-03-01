<template>
	<el-container>
		<div>
			<Tab @change="refresh" :selected="reqData.houseFormat" @communityChange="communityChange"/>
		</div>
		<el-container>
			<el-header style="height:auto;padding-right:0">
				<div class="ops-bills">
					<div class="flexcenter">
						<RentStatus class="status" @leasingStatus="leasingStatus"/>
						<RentManager class="manager" :houseKeeper='houseKeeper'/>
					</div>
					<div class="flexcenter">
						<span class="result-info" v-if="housesRent">{{housesRent.paging.count}}项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>
				</div><search-all :title="'搜索姓名/电话'"></search-all>
			</el-header>
			
			<div class="result">
				<DataTable v-if="housesRent" :housesrentData='housesRent' :index="reqData.index" class="rentTable" v-loading="!housesRent" @refresh="refresh" @pageSize="pageSize" @rentWithout='query' @paymFresh="query()"/>
			</div>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		RentStatus,
		DataTable,
		RentManager,
		RentSearch
	} from '~/modules/rent';
	import {readableDuration} from '../../utils/date.js'
	export default {
		components: {
			Tab,
			RentStatus,
			RentManager,
			DataTable,
			RentSearch
		},
		data() {
			return {
				housesRent: null,
				reqData:{
					houseFormat:'SHARE',
					size:20,
					index:1
				},
				houseKeeper:null
			};
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			}
		},
		created() {
			// this.query();
			this.$modal.$on('keyup',(data)=>{this.setSearch(data)})
    	},
		methods: {
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
			leasingStatus(data) {
				if(data!=='all'){
					this.reqData.leasingStatus = data
				}else{
					delete this.reqData.leasingStatus
				}
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
			refresh(type,commiunityId) {
				this.reqData.houseFormat = type
				if(commiunityId!==undefined){
					this.reqData.locationId = commiunityId
				}else{
					delete this.reqData.locationId
				}
				this.query();
			},
			pageSize(val){
				this.reqData.index = val
				this.query()
			},
			query(){
				this.$model('contracts')
				.query(this.reqData, {projectId: this.projectId})
				.then((data) =>{
					data.data.forEach(element => {
						element.toDate = new Date(parseInt(element.to) * 1000).toLocaleDateString().replace(/年|月/g, "-")
						element.fromDate = new Date(parseInt(element.from) * 1000).toLocaleDateString().replace(/年|月/g, "-")
						element.allM = readableDuration(element.to - element.from)
						element.strategy.freq.rentprice = element.strategy.freq.rent/100
						element.strategy.bondprice = element.strategy.bond/100
					});
					this.$set(this, 'housesRent', data)
				})
				this.$store.dispatch('HOUSE_KEERER',{
						projectId:this.projectId
					}).then(data=>{
						this.$set(this,'houseKeeper',data)
					})
			},
			showmessage(data) {
				console.log(data)
			},
			importrent(mytalbe) {

			}
		}
	};
</script>

<style lang="less" scoped>
	.page-bill-index {
		display: flex;
		min-width: 275px;
	}

	.ops-bills {
		// margin-bottom: 20px;
		height: 54px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result {
		margin-left: 20px;
		display: block;
		&:before {
			clear: both;
		}
	}

	.actions {
		// margin-top: 10px;
		margin-left: 10px;
	}
	.manager{
		margin-bottom: 11px;
	}
</style>