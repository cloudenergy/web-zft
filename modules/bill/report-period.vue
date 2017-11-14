<template>
    <div>
        <el-button plain disabled>日期</el-button>
        <el-select v-model="period" filterable placeholder="Select" class="select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
    	data() {
    		return {
    			options: [
    				{
    					value: 'all',
    					label: '全部'
    				},
    				{
    					value: '1',
    					label: '近1月'
    				},
    				{
    					value: '3',
    					label: '近3月'
    				},
    				{
    					value: '6',
    					label: '近6月'
    				},
    				{
    					value: '12',
    					label: '近1年'
    				}
    			],
    			period: '1'
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .select {
    	width: 50%;
    }
</style>
