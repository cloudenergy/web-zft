<template>
	<el-container>
		<!-- <div>
			<Tab/>
		</div> -->
		<el-container>
			<el-header style="height:auto">
				<flowm/>
			</el-header>
			<el-main>
				
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		flowchnnel,
		flowmounth,
		flowsubject,
		quantum,
		flowm
	} from '~/modules/flow';
	export default {
		components: {
			Tab,
			flowchnnel,
			flowmounth,
			flowsubject,
			quantum,
			flowm
		},
		data() {
			return {
				
			}
		},
		
	}
</script>

<style lang="css">

</style>