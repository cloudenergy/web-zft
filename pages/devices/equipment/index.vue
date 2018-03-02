

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
						<div class="flexcenter">
							<room-search @input="roomSearch" v-model="info.search"></room-search>
							<rooms-select @input="search" v-model="info.room"></rooms-select>
							<room-manager @input="manager" v-model="info.manager"/>
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
			<el-main style="max-width:100%;padding-right:0">
				<equipmentset :devices="devices"/>
			</el-main>
		</el-container>
    </el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		equipmentset
	} from '~/modules/devices'
	import {
		RentSearch
	} from '~/modules/rent'
	import _ from 'lodash'
export default {
	components: {
		Tab,
		RentSearch,
		equipmentset
	},
	data(){
		return{
			houseFormat: 'SHARE',
			info:{
				search:'',
				room:'',
				manager:''
			},
			houses:[],
			paging:'',
			testArray:[],
			entire:false,
			tabCard:true,
			entireHouse:[],
			reqData:{
				size:1,
				idnex:20,
				mode:'BIND'
			},
			devices:[]
		}
	},
	computed : {
		projectId(){
			return this.$store.state.userInfo.user.projectId
		}
	},
	methods: {
		communityChange(data) {
			if(data==='0'){
				delete this.reqData.locationId
				this.query()
			}else{
				this.reqData.locationId = data
				this.query()
			}
		},
		sendThird(data){
			this.query()
		},
		query() {
    		this.$model('devices')
    			.query(this.reqData,{ projectId: this.projectId })
    			.then(res=>{
					this.$set(this,'devices',_.chunk(res.data,20)[0])
					console.log(res)
				})
				.catch(err=>{
					console.log(err)
				})
    	},
		showmessage(data){
			console.log(data)
		},
		search(data){
			console.log(data)
		},
		roomSearch(data){
			console.log(data)
		},
		manager(data){
			console.log(data)
		},
		refresh(type,commiunityId) {
			// this.reqData.houseFormat = type
			if(commiunityId!==undefined){
				this.reqData.locationId = commiunityId
			}else{
				delete this.reqData.locationId
			}
			this.query();
		}
	}
}
</script>

 <style lang="less" scoped>
	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.result-info{
		margin-right:5px
	}
 </style>
 