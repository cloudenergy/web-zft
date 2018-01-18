<template>
	<flowm/>
</template>

<script>
import { Tab } from '~/modules/house';
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
	computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
	created () {
	},
	data() {
		return {
			mounthFlows:[],
			flowPaging:''
		};
	},
	methods: {
		
	}
};
</script>

<style lang="css">

</style>