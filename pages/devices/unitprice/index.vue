<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="reqData.houseFormat" @communityChange='communityChange' @cityArea="cityArea"/>
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto;padding-right:0">
				<div class="ops-bills">
					<div class="flexcenter searchset">
						<RentSearch @childinfo="showmessage" class="setsearch"/>
						<span v-if="!configurationStatus">
							<myIconYufu style="margin-left:20px"/><span class="myiconintroduce">预付费</span>
							<myIconZujin/><span class="myiconintroduce">随租金付</span>
							<myIconNum/><span class="myiconintroduce">1号付费，其他数字以此类推</span>
						</span>
						<span v-if="configurationStatus">
							12
						</span>
					</div>
					<div class="flexcenter">
						<span class="result-info">{{countInfo.count}}项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>
				</div>
			</el-header>
			<el-main style="padding-right:0;overflow:hidden">
				<setUnitPrice :homePrice="houses" :countInfo='countInfo' @refresh="choose_refresh" @copyStatusChange='copyStatusChange' :houseFormat='houseFormat'/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import _ from 'lodash'
	import {
		Tab
	} from '~/modules/house';
	import {
		RentSearch
	} from '../../../modules/rent'
	import {
		setUnitPrice,
		myIconNum,
		myIconYufu,
		myIconZujin
	} from '../../../modules/unitprice'
	export default {
		components: {
			Tab,
			RentSearch,
			setUnitPrice,
			myIconNum,
			myIconYufu,
			myIconZujin
		},
		data() {
			return {
				houseFormat: 'SHARE',
				houses:[],
				countInfo:{},
				reqData:{
					houseFormat:'SHARE',
					size:'200',
					index:1
				},
				configurationStatus:false
			};
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
		methods:{
			copyStatusChange(data) {
				this.configurationStatus=data
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
			choose_refresh(){
				this.query()
			},
			query() {
    			this.$model('houses')
    				.query(
    					this.reqData,{ projectId: this.projectId }
    				)
    				.then(res => {
    					this.$set(this, 'houses', res.data || []);
						this.$set(this, 'countInfo', res.paging)
						this.houseFormat = this.reqData.houseFormat
					});
    		},
			showmessage(data){
				console.log(data)
			},
			communityChange(data) {
				if(data==='0'){
					delete this.reqData.locationId
				}else{
					this.reqData.locationId = data
				}
				this.query()
			},
			cityArea(data) {
				if(_.isUndefined(data)){
					delete this.reqData.divisionId
				}
				else{
					this.reqData.districtId = data.area || data.city
				}
				this.query()
			},
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
	.myiconintroduce{
		margin-right: 30px;
		font-weight: 350;
	}
	.result-info{
		margin-right:5px;
	}
 </style>
 <style>
	.searchset .nonemargin{
		margin-left: 0
	}
 </style>
 
 