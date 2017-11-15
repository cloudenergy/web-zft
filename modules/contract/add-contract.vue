<template>
	<div class="modal">
		<el-form :model="form" class="v-form" label-width="100px">
			<el-form-item label="承租信息">

			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button>取 消</el-button>
			<el-button type="primary">创建租户</el-button>
		</div>
	</div>
</template>

<script>
	import Modal from '~/plugins/modal';

	export default {
		data() {
			return {};
		}
	};
</script>

<style lang="less" scoped>
	.dialog-footer {
		text-align: right;
	}
</style>

