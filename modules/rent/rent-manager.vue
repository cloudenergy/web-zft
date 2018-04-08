<template>
	<el-select v-model="manager" clearable placeholder="管理员" size="small" class="select" @change="managerChoose">
		<el-option v-for="item in houseKeeper" :key="item.id" :label="item.username" :value="item.id"></el-option>
	</el-select>
</template>
<script>
	export default {
		props:{
			houseKeeper:{
				required:true
			}
		},
		data() {
			return {
				manager:''
			};
		},
		methods: {
			managerChoose(val) {
				this.$emit('managerChoose', val)
			}
		}
	};
</script>

<style lang="less" scoped>
	.select {
		margin-left: 30px; // margin-top: 10px;
	}
</style>