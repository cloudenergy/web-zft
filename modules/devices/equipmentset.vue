<template>
	<div class="page-house-index">
		<div class="main-container">
			<div class="houses">
				<div class="room" v-for="(house,item) in equipmentHouses" :key="item" v-if="tabCard">
					<!-- HOUSE tab显示 -->
					<div>
						<span v-if="!entire">{{house.location.name}} {{house.building}} {{house.unit}} {{house.roomNumber}}</span>
						<span v-if="entire" style="font-size:24px">{{house[0].currentFloor}} L</span>
					</div>
					<!-- 合租显示 -->
					<div class="cells" :houseId="house.houseId" v-if="!entire">
						<room :room="house" :houseId="house.houseId" class="cell" @view="showDrawer" @sendFloor="sendFloor" />
						<room v-for="(room, index) in house.rooms" :key="index" :room="room" :houseId="house.houseId" :houseFormat="houseFormat"
						    class="cell" @view="showDrawer" @sendFloor="sendFloor" @click.native="show(house.houseId,room.id)" />
					</div>
					<!-- 整幢显示 -->
					<div class="cells" :houseId="house.houseId" v-if="entire">
						<room v-for="(room, index) in house" :key="index" :room="room.rooms[0]" :house="room" :houseId="room.houseId" :houseFormat="houseFormat"
						    class="cell" @view="showDrawer" @sendFloor="sendFloor" @click.native="show(house.houseId,room.id)" />
					</div>
				</div>
				<!-- 整租显示 -->
				<div v-if="!tabCard" class="shareHouse ">
					<div style="padding:10px 0 0 10px" class="flexc wrapHouse">
						<span v-for="(house,lista) in equipmentHouses" :key="lista">
							<room v-for="(room, index) in house.rooms" :key="index" :room="room" :houseId="house.houseId" :houseFormat="houseFormat"
							    :house="house" class="cell" @view="showDrawer" @sendFloor="sendFloor" @click.native="show(house.houseId,room.id)"
							/>
						</span>
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
			},
			tabCard: {
				type: Boolean
			},
			entire: {
				type: Boolean
			},
			houseFormat: {
				type: String
			}
		},
		components: {
			room
		},
		data() {
			return {
				currentRoom: null,
				viewRoom: false,
				houseId: '',
				roomId: ''
			};
		},
		watch: {
			equipmentHouses(newval, oldval) {
				console.log(this.houseFormat)
			}
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			},
			equipmentHouses: function () {
				if (this.houseFormat !== 'ENTIRE') {
					return this.houses.map((element, index) => {
						element.rooms.map((item, list) => {
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
		methods: {
			showDrawer(room) {
				this.currentRoom = room;
				this.viewRoom = true;
			},
			sendFloor(data) {
				this.$emit('sendThird')
			},
			show(house, room) {

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

		.room+.room {
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

	.shareHouse {
		background-color: #fff;
		.wrapHouse {
			flex-wrap: wrap;
			.cell {
				margin: 10px
			}
		}

	}
</style>