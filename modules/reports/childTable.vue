<template>
<!-- <span>
    {{tableData}}
</span> -->
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :data="tableData5" style="width:100%"  :show-header='false'>
            <el-table-column prop="id"></el-table-column>
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="desc"></el-table-column>
            <el-table-column prop="desc"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="a">
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="b">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="c">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="d">
    </el-table-column>
  </el-table> 
  <!-- <el-p>{{tableData}}</el-p> -->
  <!-- <el-table :data='tableData'>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="a" label="a"></el-table-column>
      <el-table-column prop="b" label="b"></el-table-column>
      <el-table-column prop="c" label="c"></el-table-column>
      <el-table-column prop="d" label="d"></el-table-column>
  </el-table> -->
</template>

<style>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
.el-table__expanded-cell[class*=cell]{
    padding:0 inherit;
}
</style>

<script>
export default {
    props:{
        tableData:Array
    },
	data() {
		return {
            
			tableData5: [
				{
					id: '12987122',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				},
				{
					id: '12987123',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				},
				{
					id: '12987125',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				},
				{
					id: '12987126',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}
			],
			tableData1: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			],
			tableData2: [
				{
					date: '2016-05-02',
					name: '王小虎22',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			],
			tableData3: [
				{
					date: '2016-05-02',
					name: '王小虎33',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	}
};
</script>