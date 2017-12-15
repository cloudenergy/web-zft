<template>
  <ReportsNav :tab-name='tabName' :tabpage='page'/>
</template>

<script>
import ReportsNav from '../../../modules/reports/reports-nav';
export default {
	components: {
		ReportsNav
	},
	data() {
		return {page:"rent",
			tabName: [
				{ label: '租客', name: '1' },
				{ label: '业主', name: '2' },
			]
		};
	}
};
</script>

<style>

</style>
