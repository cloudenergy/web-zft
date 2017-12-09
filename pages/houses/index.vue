<template>
    <div class="page-house-index">
        <Tab @change="refresh" />
        <div class="main-container">
            <Search />
            <div class="houses">
                <div class="room" v-for="house in houses">
                    <p>{{house.name}}</p>
                    <div class="cells">
                        <Room v-for="(room, index) in house.rooms" :key="index" :room="room" class="cell" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Tab, Room, Search } from '~/modules/house';
    export default {
    	components: { Tab, Room, Search },
    	data() {
    		return {
    			houses: []
    		};
    	},
    	created() {
    		this.query();
    	},
    	methods: {
    		refresh(id) {
    			this.house = id;
    			this.query();
    		},
    		query() {
    			this.$model('houses')
    				.query()
    				.then(data => this.$set(this, 'houses', data));
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
    			margin-top: 20px;

    			.cell {
    				margin-right: 20px;
    			}
    		}
    	}
    }
</style>