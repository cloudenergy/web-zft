<template>
    <el-col :span="2">
        <room-manager v-model="manager" />
    </el-col>
</template>
<script>
    export default {
    	data() {
    		return {
    			manager: 'laojiang'
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
