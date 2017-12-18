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
		return {page:"租客",
			tabName: [
				{ label: '租客', name: '租客' },
				{ label: '业主', name: '业主' },
			]
		};
	}
};
</script>

<style>

</style>
