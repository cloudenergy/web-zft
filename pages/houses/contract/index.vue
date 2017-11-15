<template>
	<el-button type="primary" size="mini" @click.native="create()">
		添加
	</el-button>
</template>

<script>
	import {NewContract} from '~/modules/contract';

	export default {
		methods: {
			create(type) {
				let modal = this.$modal.open(NewContract);
			}
		}
	};
</script>

<style>

</style>