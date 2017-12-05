<template>
	<div>
		<div style="margin-left: 20px;">
			<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
				<el-button slot="append" icon="el-icon-search" @click="searchrent()"></el-button>
			</el-input>
		</div>
	</div>
</template>
<style lang="less">

</style>

<script>
	export default {
		data() {
			return {
				'input5':'',
				'msgChild':'child'
			};
		},
		methods:{
			searchrent(){
				this.$emit('childinfo',this.input5)
			}
		}
	};
</script>