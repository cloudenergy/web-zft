<template>
	<el-table :data="tableData" stripe>
		<el-table-column prop="data" label="日期" width="150">
		</el-table-column>
		<el-table-column prop="mountha" label="现金">
		</el-table-column>
		<el-table-column prop="mounthb" label="支付宝">
		</el-table-column>
		<el-table-column prop="mounthc" label="微信">
		</el-table-column>
		<el-table-column prop="mounthd" label="微信公众号">
		</el-table-column>
		<el-table-column prop="mounthe" label="总计">
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
						data: '2017-01-01',
						mountha: 100,
						mounthb: 200,
						mounthc: 300,
						mounthd: 400,
						mounthe: 500
					},
					{
						data: '2017-01-01',
						mountha: 100,
						mounthb: 200,
						mounthc: 300,
						mounthd: 400,
						mounthe: 500
					},
					{
						data: '2017-01-01',
						mountha: 100,
						mounthb: 200,
						mounthc: 300,
						mounthd: 400,
						mounthe: 500,
						mounthf: 600,
						mounthg: 700,
						mounthh: 800,
						mounthi: 900,
						mounthj: 100,
						mounthk: 110,
						mounthl: 120
					},
					{
						data: '2017-01-01',
						mountha: 100,
						mounthb: 200,
						mounthc: 300,
						mounthd: 400,
						mounthe: 500
					},
					{
						data: '2017-01-01',
						mountha: 100,
						mounthb: 200,
						mounthc: 300,
						mounthd: 400,
						mounthe: 500
					}
				],

			}
		},
		mounted() {

		}
	}
</script>