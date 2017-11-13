<template>
    <div class="secondary-side">
        <div class="buttons">
            <el-radio-group v-model="type" size="mini">
                <el-radio-button label="1">整租</el-radio-button>
                <el-radio-button label="2">合租</el-radio-button>
                <el-radio-button label="3">独栋</el-radio-button>
            </el-radio-group>
        </div>
        <div class="filters">
            <el-select v-model="filters.city" size="mini" clearable placeholder="请选择城市">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="filters.area" size="mini" clearable placeholder="请选择区域">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-card class="box-card">
            <ul class="list house-list">
                <li class="">全部小区</li>
                <li>朝会小区</li>
                <li>保利香槟国际</li>
            </ul>
        </el-card>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			type: 1,
    			filters: {
    				city: "",
    				area: ""
    			},
    			options: []
    		};
    	},
    	methods: {
    		change(key) {
    			this.$emit("change", key);
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .secondary-side {
    	width: 240px;
    	text-align: center;

    	.filters {
    		margin-top: 15px;
    		display: flex;
    		justify-content: space-between;

    		.el-select {
    			width: 48%;
    		}
    	}

    	.box-card {
    		margin-top: 16px;
    	}

    	.list {
    		text-align: left;
    		list-style: none;

    		li {
    			height: 30px;
    			line-height: 30px;
    		}
    	}

    	.house-list li + li {
    		border-top: 1px solid @light;
    	}
    }
</style>