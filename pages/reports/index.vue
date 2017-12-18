<template>
  <ReportsNav :tab-name='tabName' :tabpage='page' />
</template>

<script>
import ReportsNav from '../../modules/reports/reports-nav';
export default {
	components: {
		ReportsNav
	},
	data() {
		return {
			page:"运营数据",
      tabName: [
		{ label: '运营数据',name:"运营数据" },
		{ label: '业务出房',name:"业务出房" },
		{ label: '业务收支',name:"业务收支" },
		{ label: '收房出房',name:"收房出房" }
	],
			pickerOptions2: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},
			value3: [new Date(1512972948), new Date(2000, 10, 11, 10, 10)],
			value4: '',
			// searchTab:['房源','时间','城市','小区','房源归属']
		};
	}
};
</script>