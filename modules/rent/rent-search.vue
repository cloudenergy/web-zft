<template>
	<div>
		<div class="marginleft nonemargin">
			<el-input placeholder="请输入小区/门牌号" v-model="input" class="input-with-select">
				<el-button slot="append" icon="el-icon-search" @click="searchrent()"></el-button>
			</el-input>
		</div>
	</div>
</template>
<style lang="less">
	.marginleft {
		margin-left: 20px
	}
</style>

<script>
	export default {
		data() {
			return {
				'input': '',
				'msgChild': 'child'
			};
		},
		methods: {
			searchrent() {
				this.$emit('childinfo', this.input)
			}
		}
	};
</script>