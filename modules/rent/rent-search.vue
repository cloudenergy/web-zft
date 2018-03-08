<template>
	<div>
		<div class="marginleft nonemargin">
			<el-input :placeholder='placeholder' v-model="input" class="input-with-select" @keyup.native.enter="login">
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
		props: {
			placeholder: {
				type: String
			}
		},
		methods: {
			searchrent() {
				this.$emit('childinfo', this.input)
			},
			login() {
				this.searchrent()
			}
		}
	};
</script>