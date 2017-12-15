<template>
<!-- <p>{{tableTab}}</p> -->
  <el-table
    :data="tableTab"
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
.el-table__expanded-cell[class*='cell'] {
	padding: 0 inherit;
}
</style>

<script>
export default {
	props: {
		tableData: String 
	},
	data() {
		return {
			tableTab: Array,
			tableTab1: [
				{
					name: 'index',
					a: 'index',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'index',
					a: 'index',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'index',
					a: 'index',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'index',
					a: 'index',
					b: '2',
					c: '3',
					d: '4'
				}
			],
			tableTab2: [
				{
					name: 'bill',
					a: 'bill',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'bill',
					a: 'bill',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'bill',
					a: 'bill',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'bill',
					a: 'bill',
					b: '2',
					c: '3',
					d: '4'
				}
			],
			tableTab3: [
				{
					name: 'reports',
					a: 'reports',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'reports',
					a: 'reports',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'reports',
					a: 'reports',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'reports',
					a: 'reports',
					b: '2',
					c: '3',
					d: '4'
				}
			],
			tableTab4: [
				{
					name: 'rent',
					a: 'rent',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'rent',
					a: 'rent',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'rent',
					a: 'rent',
					b: '2',
					c: '3',
					d: '4'
				},
				{
					name: 'rent',
					a: 'rent',
					b: '2',
					c: '3',
					d: '4'
				}
			],
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
			]
		};
	},
	methods: {
		ta() {
			console.log(typeof this.tableData);
			console.log(typeof 'index');

			if (this.tableData === 'index') {
				alert(12);
			}

			switch (this.tableData) {
				case 'index':
					this.tableTab = this.tableTab1;
					console.log(1);
					break;
				case 'bill':
					this.tableTab = this.tableTab2;
					console.log(2);
					break;
				case 'reports':
					this.tableTab = this.tableTab3;
					console.log(3);
					break;
				case 'rent':
					this.tableTab = this.tableTab4;
					console.log(4);
					break;
			}
		}
	},
	created() {
		switch (this.tableData) {
				case 'index':
					this.tableTab = this.tableTab1;
					console.log(1);
					break;
				case 'bill':
					this.tableTab = this.tableTab2;
					console.log(2);
					break;
				case 'profits':
					this.tableTab = this.tableTab3;
					console.log(3);
					break;
				case 'rent':
					this.tableTab = this.tableTab4;
					console.log(4);
					break;
			}
	},
	mounted:function(){
		// fa()
	}
};
</script>