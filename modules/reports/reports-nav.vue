<template>
	<el-tabs v-model='activeName' @tab-click="handleClick">
		<el-tab-pane v-for='item in tabName' :label='item.label' :name='item.name' :key="item.id">
			<!-- {{tab1}} -->
			<ReportsSearch :is-show='searchIsShow' />
			<ChildTable :table-data="giveTable" :have-expand='haveExpand' />
		</el-tab-pane>
	</el-tabs>

</template>
<script>
	import ChildTable from './childTable';
	import ReportsSearch from './reports_search';
	export default {
		props: {
			tabpage: String,
			tabName: Array,

		},
		components: {
			ChildTable,
			ReportsSearch
		},

		data() {
			return {
				activeName: this.tabpage,
				giveTable: '',
				searchIsShow: '',
				haveExpand: Boolean
			};
		},
		methods: {
			handleClick(tab, event) {
				this.giveTable = this.activeName;
				switch (this.activeName) {
					case '运营数据':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'归属'
						];
						this.haveExpand = true
						break;
					case '业务出房':
						this.searchIsShow = [
							'房源',
							'时间',
							'角色',
							'员工',
							'归属'
						];
						this.haveExpand = false
						break;
					case '业务收支':
						this.searchIsShow = [
							'时间',
							'归属'
						];
						this.haveExpand = false
						break;
					case '收房出房':
						this.searchIsShow = [
							'时间',
							'归属'
						];
						this.haveExpand = false
						break;
					case '租客':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'显示',
							'状态',
							'签约人',
							'归属'
						];
						this.haveExpand = false
						break;
					case '业主':
						this.searchIsShow = [
							'房源',
							'城市',
							'小区',
							'显示',
							'状态',
							'签约人',
							'归属'
						];
						this.haveExpand = false
						break;
					case '按科目（汇总）':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'归属'
						];
						this.haveExpand = false
						break;
					case '按科目（明细）':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'结余',
							'显示',
							'状态',
							'归属'
						];
						this.haveExpand = false
						break;
					case '按月度':
						this.searchIsShow = [
							'房源',
							'城市',
							'小区',
							'流水',
							'状态',
							'归属'
						];
						this.haveExpand = false
						break;
					case '待收账单':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'状态',
							'归属'
						];
						this.haveExpand = false
						break;
					case '待付账单':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'状态',
							'签约人',
							'归属'
						];
						this.haveExpand = false
						break;
					case '已完成收入':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'显示',
							'流水',
							'状态',
							'签约人',
							'归属'
						];
						this.haveExpand = false
						break;
					case '已完成支出':
						this.searchIsShow = [
							'房源',
							'时间',
							'城市',
							'小区',
							'状态',
							'签约人',
							'归属'
						];
						this.haveExpand = false
						break;
				}
			}
		},
		created: function () {
			this.giveTable = this.tabpage;
			switch (this.activeName) {
				case '运营数据':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'归属'
					];
					this.haveExpand = true
					break;
				case '业务出房':
					this.searchIsShow = [
						'房源',
						'时间',
						'角色',
						'员工',
						'归属'
					];
					this.haveExpand = false
					break;
				case '业务收支':
					this.searchIsShow = [
						'时间',
						'归属'
					];
					this.haveExpand = false
					break;
				case '收房出房':
					this.searchIsShow = [
						'时间',
						'归属'
					];
					this.haveExpand = false
					break;
				case '租客':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'显示',
						'状态',
						'签约人',
						'归属'
					];
					this.haveExpand = false
					break;
				case '业主':
					this.searchIsShow = [
						'房源',
						'城市',
						'小区',
						'显示',
						'状态',
						'签约人',
						'归属'
					];
					this.haveExpand = false
					break;
				case '按科目（汇总）':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'归属'
					];
					this.haveExpand = false
					break;
				case '按科目（明细）':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'结余',
						'显示',
						'状态',
						'归属'
					];
					this.haveExpand = false
					break;
				case '按月度':
					this.searchIsShow = [
						'房源',
						'城市',
						'小区',
						'流水',
						'状态',
						'归属'
					];
					this.haveExpand = false
					break;
				case '待收账单':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'状态',
						'归属'
					];
					this.haveExpand = false
					break;
				case '待付账单':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'状态',
						'签约人',
						'归属'
					];
					this.haveExpand = false
					break;
				case '已完成收入':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'显示',
						'流水',
						'状态',
						'签约人',
						'归属'
					];
					this.haveExpand = false
					break;
				case '已完成支出':
					this.searchIsShow = [
						'房源',
						'时间',
						'城市',
						'小区',
						'状态',
						'签约人',
						'归属'
					];
					this.haveExpand = false
					break;
			}
		}
	};
</script>