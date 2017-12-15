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
		return {
			page:"profits",
			tabName: [
				{ label: '按科目（汇总）', name: '1' },
				{ label: '按科目（明细）', name: '2' },
				{ label: '按月度', name: '3' },
			]
		};
	},
};
</script>

<style>

</style>
