<template>
    <div class="filters">
        <el-select v-model="filters.city" size="mini" clearable placeholder="请选择城市">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="filters.area" size="mini" clearable placeholder="请选择区域">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			city: '',
    			areat: '',
    			options: [],
    			filters: {
    				ciyt: [],
    				areat: []
    			}
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .filters {
    	display: flex;
    	justify-content: space-between;
    	.el-select {
    		width: 48%;
    	}
    }
</style>
