<template>
	<el-table :data="tableData" stripe>
		<el-table-column prop="data" label="小区/公寓" width="150">
		</el-table-column>
		<el-table-column prop="mountha" label="1月">
		</el-table-column>
		<el-table-column prop="mounthb" label="2月">
		</el-table-column>
		<el-table-column prop="mounthc" label="3月">
		</el-table-column>
		<el-table-column prop="mounthd" label="4月">
		</el-table-column>
		<el-table-column prop="mounthe" label="5月">
		</el-table-column>
		<el-table-column prop="mounthf" label="6月">
		</el-table-column>
		<el-table-column prop="mounthg" label="7月">
		</el-table-column>
		<el-table-column prop="mounthh" label="8月">
		</el-table-column>
		<el-table-column prop="mounthi" label="9月">
		</el-table-column>
		<el-table-column prop="mounthj" label="10月">
		</el-table-column>
		<el-table-column prop="mounthk" label="11月">
		</el-table-column>
		<el-table-column prop="mounthl" label="12月">
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
						data: 'huanle1',
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
						data: 'huanle2',
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
						data: 'huanle3',
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
						data: 'huanle4',
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
						data: 'huanle5',
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
					}
				],

			}
		},
		mounted() {

		}
	}
</script>