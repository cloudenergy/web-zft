<template>
 <ReportsNav :tab-name='tabName'/>
</template>

<script>
import ReportsNav from '../../../modules/reports/reports-nav';

export default {
	components: {
		ReportsNav
	},
	data() {
		return {
			tabName: [
				{ label: '按科目（汇总）', name: '1' },
				{ label: '按科目（明细）', name: '2' },
				{ label: '业务收支', name: '3' },
				{ label: '收房出房', name: '4' }
			]
		};
	},
};
</script>

<style>

</style>
