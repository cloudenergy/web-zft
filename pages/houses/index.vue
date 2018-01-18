<template>
    <div class="page-house-index">
        <Tab @change="refresh" :selected="reqData.houseFormat" />
        <div class="main-container">
            <Search @changeRoom='changeRoom'/>
            <div class="houses">
                <div class="room" v-for="house in houses">
                    <div>{{house.location.name}} {{house.building}} {{house.unit}} {{house.roomNumber}}
                        <span>
                            <el-tooltip content="房源预览" placement="top" style="margin:0 5px;">
                                <span @click="showHouse(house)">
									<icon type='iconupload'/>
								</span>
                            </el-tooltip>
							<el-dropdown placement="bottom-start">
								<span class="el-dropdown-link">
									<icon type="gengduo1" />
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>编辑房源</el-dropdown-item>
									<el-dropdown-item @click.native="addRoom(house)">添加房间</el-dropdown-item>
									<el-dropdown-item @click.native="deleteHouse(house)">删除房源</el-dropdown-item>
									<el-dropdown-item>关闭房源</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
                        </span>
                    </div>
                    <div class="cells">
                        <Room v-for="(room, index) in house.rooms" :key="index" :room="room" :house="house" class="cell" @view="showDrawer" />
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
                <houseInformation :house="currentHouse" :houseType="houseFormat"/>
            </div>
        </drawer-panel>
    </div>
</template>

<script>
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
				}
    		};
    	},
    	computed: {
    		projectId() {
    			return this.$store.state.user.projectId;
    		}
    	},
    	created() {
    		this.query();
    	},
    	methods: {
			changeRoom(data) {
				this.reqData.bedRooms = data
				this.query()
			},
    		refresh(type) {
    			this.reqData.houseFormat = type;
    			this.query();
			},
    		query() {
    			this.$model('houses')
    				.query(
						this.reqData,
    					{ projectId: this.projectId }
    				)
    				.then(res => {
    					// console.log('data: ', data);
    					this.$set(this, 'houses', res.data || []);
						error=>{
							console.log(error)
						}
    				});
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
    					});
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
			}
    	}
    };
</script>

<style lang="less" scoped>
    .page-house-index {
    	display: flex;

    	.main-container {
    		flex: 1;
    		margin-left: 40px;
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
</style>