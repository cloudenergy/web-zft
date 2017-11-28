<template>
    <div class="group floors-group">
        <el-form-item label="层高">
            <el-input placeholder="层高" v-model.lazy.number="max" max="30"></el-input>
        </el-form-item>
        <div class="floors">
            <span v-for="floor in max" :class="{out: isExcluded(floor)}" :key="floor" @click="toggle(floor)">{{floor}}</span>
        </div>
    </div>
</template>

<script>
    export default {
    	methods: {
    		isExcluded(val) {
    			return ~this.exclude.indexOf(val);
    		},
    		toggle(val) {
    			let idx = this.exclude.indexOf(val);
    			~idx ? this.exclude.splice(idx, 1) : this.exclude.push(val);
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
    	data() {
    		return {
    			max: 7,
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
    			margin-top: 10px;
    			float: left;
    			.size(30px);
    			line-height: 30px;
    			border: 1px solid @primary;
    			text-align: center;
    			margin-right: 10px;
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
    }
</style>

