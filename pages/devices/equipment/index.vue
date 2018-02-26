

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
				<equipmentset :houses="houses" @sendThird="sendThird" :entire='entire' :tabCard='tabCard' :houseFormat="houseFormat"/>
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
					houseFormat: 'SHARE',
					size:200,
					index:1
			}
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
			console.log(1)
			this.query()
		},
		query() {
    		this.$model('houses')
    			.query(this.reqData,{ projectId: this.projectId })
    			.then(res => {
						if(this.reqData.houseFormat==='ENTIRE'){
							this.testArray = []
							this.entireHouse = []
							res.data.map((ele,index)=>{
								if(!_.includes(this.entireHouse,ele.currentFloor)){
									this.entireHouse.push(ele.currentFloor)
									var newTset = []
									newTset.push(ele)
									this.testArray.push(newTset)
								}else{
									this.testArray[_.findIndex(this.entireHouse,function(o){
										return o==ele.currentFloor
									})].push(ele)
								}
							})
							this.tabCard = true
							this.entire = true
							this.houses = this.testArray
						}else if(this.reqData.houseFormat==='SOLE'){
							this.tabCard = false
							this.$set(this, 'houses', res.data || [])
						}else{
							this.entire = false
							this.tabCard = true
							this.$set(this, 'houses', res.data || []);
						}
						this.$set(this, 'paging', res.paging || []);
						this.houseFormat = this.reqData.houseFormat
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
			this.reqData.houseFormat = type
			
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
 