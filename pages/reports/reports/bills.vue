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
			page: 'bill',
			tabName: [
				{ label: '待收账单', name: '1' },
				{ label: '待付账单', name: '2' },
				{ label: '已完成收入', name: '3' },
				{ label: '已完成支出', name: '4' }
			]
		};
	}
};
</script>

<style>

</style>
