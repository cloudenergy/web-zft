<template>
	<div>
		<bill-type v-model="billType" />
	</div>

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