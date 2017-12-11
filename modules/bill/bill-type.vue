<template>
    <el-col :span="2">
        <bill-type v-model="billType" />
    </el-col>
</template>
<script>
    export default {
    	data() {
    		return {
    			billType: 'all'
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .select {
    	// margin-left: 10px;
    	// margin-top: 10px;
    }
</style>
