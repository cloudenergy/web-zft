<template>
    <div class="page-house-index">
        <Tab @change="refresh" :selected="houseFormat" />
        <div class="main-container">
            <Search />
            <div class="houses">
                <div class="room" v-for="house in houses">
                    <div>{{house.location.name}} {{house.building}} {{house.unit}} {{house.roomNumber}}
                        <span>
                            <el-tooltip content="房源预览" placement="top" style="margin:0 5px;">
                                <icon type='iconupload' />
                            </el-tooltip>
                            <icon type="gengduo1" />
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
    </div>
</template>

<script>
    import { Tab, Room, Search, Preview } from '~/modules/house';
    export default {
    	components: { Tab, Room, Search, Preview },
    	data() {
    		return {
    			houses: [],
    			currentRoom: null,
    			currentHouse: null,
    			viewRoom: false,
    			houseFormat: 'SHARE'
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
    		refresh(type) {
    			this.houseFormat = type;
    			this.query();
    		},
    		query() {
    			this.$model('houses')
    				.query(
    					{
    						houseFormat: this.houseFormat,
    						size: 200,
    						index: 1
    					},
    					{ projectId: this.projectId }
    				)
    				.then(res => {
    					// console.log('data: ', data);
    					this.$set(this, 'houses', res.data || []);
    				});
    		},
    		showDrawer({ room, house }) {
    			this.currentRoom = room;
    			this.currentHouse = house;
    			this.viewRoom = true;
    		},
    		del(house) {
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
</style>