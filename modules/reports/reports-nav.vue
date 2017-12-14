<template>
  <el-tabs v-model='activeName' @tab-click="handleClick">
    <el-tab-pane v-for='item in tabName' :label='item.label' :name='item.name' :key="item.id">
			<!-- {{item}} -->
			<ReportsSearch />
        <ChildTable :table-data="tab1"/>
    </el-tab-pane>
  </el-tabs>

</template>
<script>
import ChildTable from './childTable';
import ReportsSearch from './reports_search';
export default {
	
	props: {
		tabName: Array
	},
	components: {
		ChildTable,
		ReportsSearch
	},

	data() {
		return {
			tab1: [
				{ name: '1', a: '11', b: '2', c: '3', d: '4' },
				{ name: '2', a: '22', b: '2', c: '3', d: '4' },
				{ name: '3', a: '33', b: '2', c: '3', d: '4' },
				{ name: '4', a: '44', b: '2', c: '3', d: '4' },
				{ name: '5', a: '55', b: '2', c: '3', d: '4' }
			],
			activeName: '1'
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		}
	}
};
</script>