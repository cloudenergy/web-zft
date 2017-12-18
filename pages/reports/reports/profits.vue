<template>
  <ReportsNav :tab-name='tabName' :tabpage='page' />
</template>

<script>
import ReportsNav from '../../../modules/reports/reports-nav';

export default {
	components: {
		ReportsNav
	},
	data() {
		return {
			page:"按科目（汇总）",
			tabName: [
				{ label: '按科目（汇总）', name: '按科目（汇总）' },
				{ label: '按科目（明细）', name: '按科目（明细）' },
				{ label: '按月度', name: '按月度' },
			]
		};
	},
};
</script>

<style>

</style>
