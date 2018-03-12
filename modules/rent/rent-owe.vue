<template>
	<el-select v-model="type" clearable placeholder="余额" size="small" class="select" @change='changeHouseKeeper'>
		<el-option v-for="item in oweTrue" :key="item.index" :label="item.type" :value="item.index"></el-option>
	</el-select>
</template>
<script>
	export default {
		data() {
			return {
				oweTrue:[{type:'全部',index:0},{type:'正常',index:1},{type:'欠费',index:2}],
                type:''
			};
        },
        methods: {
            changeHouseKeeper(val) {
                this.$emit('rentMoneyType',val)
            }
        }
	};
</script>

<style lang="less" scoped>
	.select {
		margin-left: 30px; // margin-top: 10px;
	}
</style>