<template>
    <div class="page-house-index">
        <div class="main-container">
            <div class="houses">
                <div class="room" v-for="house in houses">
                    <div>{{house.group}} {{house.building}} {{house.unit}} {{house.roomNumber}}
                        <span class="badge pull-right">2</span>
                    </div>
                    <div class="cells">
                        <room v-for="(room, index) in house.rooms" :key="index" :room="room" :houseId="house.houseId" class="cell" @view="showDrawer" @sendFloor="sendFloor" @click.native="show(house.houseId,room.id)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import room from './room.vue';
    export default {
    	components: { room },
    	data() {
    		return {
    			houses: [],
    			currentRoom: null,
    			viewRoom: false,
    			houseFormat: 'SOLE',
				houseId:'',
				roomId: ''
    		};
    	},
    	created() {
    		this.query();
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
    	methods: {
    		query() {
    			this.$model('houses')
    				.query(
    					{
    						houseFormat: this.houseFormat
    					},
    					{ projectId: this.projectId }
    				)
    				.then(res => {
    					// console.log('data: ', data);
    					this.$set(this, 'houses', res.data || []);
    				});
    		},
    		showDrawer(room) {
    			this.currentRoom = room;
    			this.viewRoom = true;
    		},
			sendFloor(data){
				// this.$model('devices_set')
				// .update({},{houseId:this.houseId,roomId:this.roomId,projectId:this.projectId,id:data})
				// .then((data)=>{
				// 	this.$message.success('绑定成功')
				// })
				// .catch(()=>{
				// 	this.$message.mistake('绑定失败')
				// })
			},
			show(house,room){
				
			},
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
    			margin-top: 20px;

    			.cell {
    				margin-right: 20px;
    			}
    		}
    	}
    }
    .drawer {
    	padding: 30px;
    }
</style>