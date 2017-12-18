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
			page: '待收账单',
			tabName: [
				{ label: '待收账单', name: '待收账单' },
				{ label: '待付账单', name: '待付账单' },
				{ label: '已完成收入', name: '已完成收入' },
				{ label: '已完成支出', name: '已完成支出' }
			]
		};
	}
};
</script>

<style>

</style>
