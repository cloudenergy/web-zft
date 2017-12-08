<template>
	<el-container>
		<div>
			<Tab/>
		</div>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<div class="flexcenter">
						<RentStatus class="status" />
						<RentManager class="manager" />
						<RentSearch class="rentsearchi" v-on:childinfo="showmessage" />
					</div>
					<div class="flexcenter">
						<span class="result-info">32项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>

				</div>
			</el-header>
			<el-main>
				<div class="result">
					<DataTable/>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		RentStatus,
		DataTable,
		RentManager,
		RentSearch
	} from '~/modules/rent';

	export default {
		components: {
			Tab,
			RentStatus,
			RentManager,
			DataTable,
			RentSearch
		},
		data() {
			return {

			};
		},
		methods: {
			showmessage(data) {
				console.log(data)
			},
			// 页面导出
			importrent(mytalbe) {
				// var table = document.getElementById(mytalbe);
				// // 克隆（复制）此table元素，这样对复制品进行修改（如添加或改变table的标题等），导出复制品，而不影响原table在浏览器中的展示。
				// table = table.cloneNode(true);
				// var uri = 'data:application/vnd.ms-excel;base64,',
				// 	template =
				// 	'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table style="vnd.ms-excel.numberformat:@">{table}</table></body></html>',
				// 	base64 = function (s) {
				// 		return window.btoa(unescape(encodeURIComponent(s)));
				// 	},
				// 	format = function (s, c) {
				// 		return s.replace(/{(\w+)}/g, function (m, p) {
				// 			return c[p];
				// 		});
				// 	};
				// if (!table.nodeType) table = document.getElementById(table);
				// var ctx = {
				// 	worksheet: name || 'Worksheet',
				// 	table: table.innerHTML
				// };
				// window.location.href = uri + base64(format(template, ctx));
			}
		}
	};
</script>

<style lang="less" scoped>
	.page-bill-index {
		display: flex;
		min-width: 275px;
	}

	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result {
		display: block;
		&:before {
			clear: both;
		}
	}

	.actions {
		// margin-top: 10px;
		margin-left: 10px;
	}
</style>