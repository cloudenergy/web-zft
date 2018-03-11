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