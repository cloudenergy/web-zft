<template>
    <div class="group floors-group">
        <el-form-item label="层高">
            <el-input placeholder="层高" v-model.lazy.number="data.totalFloor" max="30"></el-input>
        </el-form-item>
        <div class="floors">
            <span v-for="floor in data.totalFloor" :class="{out: isExcluded(floor)}" :key="floor" @click="toggle(floor)">{{floor}}</span>
        </div>
		<div class="houseCountOnFloor">
			<el-form-item label="每层房间数">
				<el-input placeholder="每层房间数" v-model.lazy.number="data.houseCountOnFloor" max="30"></el-input>
			</el-form-item>
		</div>
    </div>
</template>

<script>
	import _ from 'lodash'
    export default {
    	methods: {
    		isExcluded(val) {
    			return ~this.exclude.indexOf(val);
    		},
    		toggle(val) {
    			let idx = this.exclude.indexOf(val);
				~idx ? this.exclude.splice(idx, 1) : this.exclude.push(val)
				this.data.enabledFloors = _.difference(this.enabled,this.exclude)
    		}
		},
		props: {
			data: {
				required: true
			}
		},
    	watch: {
    		max(val) {
    			if (val > 30) {
    				// alert user
    				this.max = 30;
    			}
    		}
		},
		computed: {
			enabled() {
				return _.range(1,this.data.totalFloor+1)
			},
		},
		mounted () {
			this.data.enabledFloors = this.enabled	
		},
    	data() {
    		return {
				exclude: []
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .floors-group {
    	flex-direction: column;
    	padding-bottom: 20px;

    	.floors {
    		span {
    			margin: 10px 10px 0 0;
    			float: left;
    			.size(30px);
    			line-height: 30px;
    			border: 1px solid @primary;
    			text-align: center;
    			border-radius: 2px;
    			background-color: @primary;
    			color: #fff;
    			cursor: pointer;

    			&.out {
    				background: #fff;
    				color: @primary;
    			}
    		}
		}
		.houseCountOnFloor{
			margin-top: 10px;
		}
    }
</style>

