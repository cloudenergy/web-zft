<template>
    <div class="page-house-index">
        <div class="main-container">
            <div class="houses">
                <div class="room" v-for="house in equipmentHouses">
                    <div>{{house.location.name}} {{house.building}} {{house.unit}} {{house.roomNumber}}
                        <span class="badge pull-right">{{house.rooms.length+1}}</span>
                    </div>
                    <div class="cells" :houseId="house.houseId">
						<room :room="house" :houseId="house.houseId" class="cell" @view="showDrawer" @sendFloor="sendFloor" />
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
		props: {
    		houses: {
    			required: true
    		}
    	},
    	components: { room },
    	data() {
    		return {
    			currentRoom: null,
    			viewRoom: false,
    			houseFormat: 'SOLE',
				houseId:'',
				roomId: ''
    		};
    	},
    	
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			},
			equipmentHouses:function() {
				return this.houses.map((element,index)=>{
					element.rooms.map((item,list)=>{
						if(item.devices!=''||null){
							item.devices.map((ele,num)=>{
								ele.updatedAtTime = new Date(parseInt(ele.updatedAt) * 1000).toLocaleDateString().replace(/\//g, "-")
								item.devicesChooseElectricity = []
								if(ele.type=='ELECTRICITY'){
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
			}
		},
    	methods: {
    		showDrawer(room) {
    			this.currentRoom = room;
    			this.viewRoom = true;
    		},
			sendFloor(data){
				this.$emit('sendThird')
			},
			show(house,room){
				
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
				max-width: 100%;
				flex-wrap: wrap;
    			.cell {
					margin-top: 20px;
    				margin-right: 20px;
    			}
    		}
    	}
    }
    .drawer {
    	padding: 30px;
    }
</style>