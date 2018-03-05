<template>
    <div class="page-house-index">
        <Tab @change="refresh" :selected="reqData.houseFormat" @communityChange='communityChange' ref="setLocation" class="communityTab" @cityArea="cityArea"/>
        <div class="main-container">
            <Search @changeRoom='changeRoom' @changeRoomsStatus='changeRoomsStatus' @changeHouseKeeper='changeHouseKeeper' :houseKeeper='houseKeeper' />
			<search-all :title="'搜索小区/门牌/电话'"></search-all>
            <div class="houses" ref="house">
                <div class="room" v-for="(house,index) in equipmentHouses" v-if="tabCard" :key="index">
                    <div>
						<span v-if="!entire">{{house.location.name}} {{house.building}}幢 {{house.unit}}单元 {{house.roomNumber}}室</span>
						<span v-if="entire" style="font-size:24px">{{house[0].currentFloor}} L</span>
                        <span>
                            <el-tooltip content="房源预览" placement="top" style="margin:0 5px;">
                                <span @click="showHouse(house)">
									<icon type='iconupload' style="font-size:16px;margin-top:-1px"/>
								</span>
                            </el-tooltip>
							<el-dropdown placement="bottom-start">
								<span>
									<icon type="gengduo1" style="font-size:15px;margin-top:3px"/>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="addRoom(house)">添加房间</el-dropdown-item>
									<el-dropdown-item @click.native="deleteHouse(house)">删除房源</el-dropdown-item>
									<el-dropdown-item>关闭房源</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
                        </span>
                        <!-- <span class="badge pull-right">{{house.rooms.length}}</span> -->
                    </div>
                    <div class="cells" v-if="!entire">
                        <Room v-for="(room, index) in house.rooms" :key="index" :room="room" :house="house" class="cell" @view="showDrawer" @successRefresh='successRefresh' :houseFormat="houseFormat"/>
                    </div>
					<div class="cells" v-if="entire">
						<span v-for="(item, list) in house" :key="list">
							<Room v-for="(room, index) in item.rooms" :key="index" :room="room" :house="item" class="cell" @view="showDrawer" @successRefresh='successRefresh' :houseFormat="houseFormat"/>
						</span>
                    </div>
                </div>
				<!-- 整租 -->
				<div v-if="!tabCard" class="shareHouse ">
					<div style="padding:10px 0 0 10px" class="flexc wrapHouse">
						<span v-for="(house,lista) in houses" :key="lista">
							<Room v-for="(room, index) in house.rooms" :key="index" :room="room" :house="house" class="cell" @view="showDrawer" @successRefresh='successRefresh' :houseFormat="houseFormat"/>
						</span>
					</div>
				</div>
				
            </div>
        </div>
        <drawer-panel :open.sync="viewRoom">
            <div v-if="viewRoom" class="drawer">
                <Preview :room="currentRoom" :house="currentHouse" />
            </div>
        </drawer-panel>
		<drawer-panel :open.sync="viewHouse">
            <div v-if="viewHouse" class="drawer">
                <houseInformation :house="currentHouse" :houseType="reqData.houseFormat"/>
            </div>
        </drawer-panel>
    </div>
</template>

<script>
	import _ from 'lodash'
    import { Tab, Room, Search, Preview, houseInformation } from '~/modules/house';
    export default {
    	components: { Tab, Room, Search, Preview, houseInformation },
    	data() {
    		return {
    			houses: [],
    			currentRoom: null,
    			currentHouse: null,
    			viewRoom: false,
    			viewHouse: false,
				reqData:{
					houseFormat: 'SHARE',
    				size: 200,
					index: 1
				},
				entireHouse:[],
				testArray:[],
				entire:false,
				tabCard:true,
				houseFormat:'SHARE',
				houseKeeper:null
    		};
    	},
    	computed: {
    		projectId() {
    			return this.$store.state.userInfo.user.projectId;
			},
			equipmentHouses: function () {
				if (this.houseFormat !== 'ENTIRE') {
					return this.houses.map((element, index) => {
						element.rooms.map((item, list) => {
							if (item.devices != '' || null) {
								item.devicesChooseElectricity = []
								item.devices.map((ele, num) => {
									ele.updatedAtTime = new Date(parseInt(ele.updatedAt) * 1000).toLocaleDateString().replace(/\//g, "-")
									if (ele.type == 'ELECTRICITY') {
										item.devicesChooseElectricity.push(ele)
									}
									return ele
								})
								item.showEquipment = item.devicesChooseElectricity[0]
							}
							return item
						})
						element.showEquipment = element.devices[0]
						return element
					})
				} else {
					return this.houses.map((element, index) => {
						element.map((house) => {
							house.rooms.map((item, list) => {
								if (item.devices != '' || null) {
									item.devices.map((ele, num) => {
										ele.updatedAtTime = new Date(parseInt(ele.updatedAt) * 1000).toLocaleDateString().replace(/\//g, "-")
										item.devicesChooseElectricity = []
										if (ele.type == 'ELECTRICITY') {
											item.devicesChooseElectricity.push(ele)
										}
										return ele
									})
									item.showEquipment = item.devicesChooseElectricity[0]
								}
								return item
							})
							house.showEquipment = house.devices[0]
							return house
						})
						return element
					})
				}

			}
    	},
    	created() {
			// this.query();
			this.$modal.$on('keyup',(data)=>{this.setSearch(data)}),
			this.$modal.$on('refresh', () => {
				this.refresh(this.reqData.houseFormat)
			})
			let that = this;
			document.addEventListener('scroll',that.scrollFunc,true)
		},
    	methods: {
			scrollFunc() {
				console.log(this.$refs.house.scrollHeight)
			},
			cityArea(data) {
				if(_.isUndefined(data)){
					delete this.reqData.districtId
				}
				else{
					this.reqData.districtId = data.area || data.city
				}
				this.query()
			},
			setSearch(data) {
				if(/house/.test(location.pathname)){
					if(data!==''){
						this.reqData.q=data
					}
					else{
						delete this.reqData.q
					}
					this.query()
				}
			},
			communityChange(data) {
				if(data==='0'){
					delete this.reqData.locationId
				}else{
					this.reqData.locationId = data
				}
				this.query()
			},
			changeRoom(data) {
				if(data!==0) {
					this.reqData.bedRooms = data
				}else{
					delete this.reqData.bedRooms
				}
				this.query()
			},
			changeRoomsStatus(data) {
				this.reqData.status = data
				this.query()
			},
			changeHouseKeeper(data) {
				this.reqData.houseKeeper = data
				this.query()
			},
    		refresh(type,commiunityId) {
				if(/houses/.test(document.location.pathname)) {
					this.reqData.houseFormat = type;
					if(commiunityId!==undefined){
						this.reqData.locationId = commiunityId
					}else{
						delete this.reqData.locationId
					}
					delete this.reqData.districtId
					this.query();
				}
			},
    		query() {
				// TODO ZHOUYI house接口size设置
    			this.$model('houses')
    				.query(
						this.reqData,
    					{ projectId: this.projectId }
    				)
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
						this.houseFormat = this.reqData.houseFormat
					})
					.catch(err=>{
						console.log(err)
					})
					this.$store.dispatch('HOUSE_KEERER',{
						projectId:this.projectId
					}).then(data=>{
						this.$set(this,'houseKeeper',data)
					})
    		},
    		showDrawer({ room, house }) {
    			this.currentRoom = room;
    			this.currentHouse = house;
    			this.viewRoom = true;
    		},
			showHouse(house){
				this.currentHouse = house
				this.viewHouse = true
			},
    		deleteHouse(house) {
    			this.$confirm('确认删除该房源, 是否继续?', '提示', {
    				confirmButtonText: '确定',
    				cancelButtonText: '取消',
    				type: 'warning'
    			})
    				.then(() => {
    					this.$model('houses').delete(null, {
    						id: house.houseId,
    						projectId: this.projectId
						})
						.then(res=>{
							this.$message.success('删除成功')
							this.query()
						})
						.catch(e=>{
							this.$message('删除失败')
						})
    				})
    				.catch(e => {
    					console.log(e);
    					this.$message({
    						type: 'info',
    						message: '已取消删除'
    					});
    				});
			},
			addRoom(data){
				this.$model('add_room')
				.create({},{projectId:this.projectId,houseId:data.houseId})
				.then(res=>{
					this.$message.success('添加成功')
					this.query()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			successRefresh(){
				this.query()
			}
    	}
    };
</script>

<style lang="less" scoped>
    .page-house-index {
    	display: flex;

    	.main-container {
    		flex: 1;
    		margin-left: 20px;
    	}

    	.room + .room {
    		margin-top: 20px;
    	}

    	.room {
    		width: 100%;
    		background-color: #fff;
    		box-shadow: 0 0 4px #ddd;
    		border-radius: 2px;
    		color: @dark;
    		padding: 20px;

    		.cells {
    			display: flex;
    			flex-wrap: wrap;
    			margin-top: 20px;

    			.cell {
    				margin-right: 20px;
    				margin-bottom: 20px;
    			}
    		}
    	}
    }
    .drawer {
    	padding: 30px;
	}
	.moreSet{
		position: relative;
			ul{
				position: absolute;
				top:13px;
				left:-25px;				
				width: 60px;
				background: #fff;
				box-shadow:0 0 1px #CCC;
				display: none;
				overflow: hidden;
				text-align: center;
				z-index:100;
				li{
					list-style: none;
					margin:4px 0;
				}
			}
	}
	.moreSet:hover ul{
		display: block;	
		li:hover{
			color:#409eff
		}			
	}
	.shareHouse{
		background-color: #fff;
		.wrapHouse{
			flex-wrap:wrap;
			.cell {
    				margin:10px
    			}
		}
		
	}
</style>