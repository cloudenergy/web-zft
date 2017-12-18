<template>
    <div class="page-house-index">
        <Tab @change="refresh" />
        <div class="main-container">
            <Search />
            <div class="houses">
                <div class="room" v-for="house in houses">
                    <div>{{house.name}}
                        <span class="badge pull-right">2</span>
                    </div>
                    <div class="cells">
                        <Room v-for="(room, index) in house.rooms" :key="index" :room="room" class="cell" @view="showDrawer" />
                    </div>
                </div>
            </div>
        </div>
        <drawer-panel :open.sync="viewRoom">
            <div v-if="viewRoom" class="drawer">
                <Preview />
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
    			viewRoom: false,
    			houseFormat: 'SHARE'
    		};
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
    						houseFormat: this.houseFormat
    					},
    					{ projectId: '980488114' }
    				)
    				.then(data => this.$set(this, 'houses', data));
    		},
    		showDrawer(id) {
    			this.viewRoom = true;
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