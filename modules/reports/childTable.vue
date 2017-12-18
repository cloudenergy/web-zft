<template>
<!-- <p>{{tableTab}}</p> -->
  <el-table
    :data="tableTab"
    style="width: 100%">
	<template v-for="head in tabHead">
    <el-table-column type="expand" v-if="haveExpand">
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
	v-for='(v,k,i) in head'
      :label="v"
      :prop="k"
	  :key='v.id'>
    </el-table-column>
    <!-- <el-table-column
      label="可出租天数"
      prop="b">
    </el-table-column>
    <el-table-column
      label="空置天数"
      prop="c">
    </el-table-column>
    <el-table-column
      label="平均空置天数"
      prop="d">
    </el-table-column>
	<el-table-column
      label="空置率"
      prop="e">
    </el-table-column>
	<el-table-column
      label="出房次数"
      prop="f">
    </el-table-column>
	<el-table-column
      label="平均出房天数"
      prop="g">
    </el-table-column>
	<el-table-column
      label="出房均价"
      prop="h">
    </el-table-column>
	<el-table-column
      label="空置损失"
      prop="i">
    </el-table-column> -->
	</template>
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
		tableData: String,
		haveExpand:Boolean
	},
	data() {
		return {
			tableTab: Array,
			tabHead: Array,
			tabHead1: [
				{
					a: '小区/公寓',
					b: '可出租天数',
					c: '空置天数',
					d: '平均空置天数',
					e: '空置率',
					f: '出房次数',
					g: '平均出房天数',
					h: '出房均价',
					i: '空置损失'
				}
			],
			tabHead2: [
				{
					a: '姓名',
					b: '角色',
					c: '录入客源',
					d: '带看',
					e: '新签',
					f: '续租',
					g: '转租',
					h: '换房'
				}
			],
			tabHead3: [
				{
					a: '租金',
					b: '其他',
					c: '违约金',
					d: '押金',
					
				}
			],
			tabHead4: [
				{
					a: '部门',
					b: '收房/套',
					c: '出房/个',
					d: '押金'
				}
			],

			tabHead5: [
				{		a: '小区/公寓',
					b: '租金收入',
					c: '租金支出',
					d: '利润',
					e: '利润率',
					f: '其它收入',
					g: '其它支出',
					h: '全部利润'
				}
			],
			tabHead6: [
				{
					a: '小区',
					b: '电费',
					c: '煤气费',
					d: '冷水费',
					e: '租金',
					f: '违约金',
					g: '总额',
				}
			],tabHead7: [
				{
					a: '小区/公寓',
					b: '租金收入',
					c: '租金支出',
					d: '利润',
					e: '利润率',
					f: '其它收入',
					g: '其它支出',
					h:'利润',
					i:'全部利润',
					j:'利润率'
				}
			],
tabHead8: [
				{
					a: '小区/公寓',
					b: '1月',
					c: '2月',
					d: '3月',
					e: '4月',
					f: '5月',
					g: '6月',
					h:'7月',
					i:'8月',
					j:'9月',
					k:'10月',
					l:'11月',
					m:'12月',
					n:'总计'

				}
			],
			tableTab1: [
				{
					a: '闸弄口东村',
					b: '352',
					c: '352',
					d: '100.00%',
					e: '0',
					f: '352',
					g: '-',
					h: '-',
					i: '1,443'
				},
				{
					a: '朝晖三区',
					b: '3303',
					c: '232',
					d: '2',
					e: '84.14%',
					f: '12',
					g: '8,790',
					h: '232',
					i: '8,790'
				},
				{
					a: '保利香槟国际',
					b: '572',
					c: '85',
					d: '3',
					e: '59.44%',
					f: '5',
					g: '68',
					h: '1,513',
					i: '5,334'
				},
				{
					a: '新帝朗郡',
					b: '1328',
					c: '312',
					d: '4',
					e: '93.98%',
					f: '2',
					g: '624',
					h: '1,000',
					i: '0'
				}
			],
			tableTab2: [
				{
					name: '姓名',
					a: '角色',
					b: '录入客源',
					c: '带看',
					d: '新签',
					e: '续租',
					f: '转租',
					g: '换房'
				},
				{
					name: '胡恒',
					a: '超级管理员',
					b: '0',
					c: '0',
					d: '39',
					e: '3',
					f: '1',
					g: '0'
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
	watch: {
		tableData: 'ta'
	},
	methods: {
		ta() {
			switch (this.tableData) {
				case '运营数据':
					this.tableTab = this.tableTab1;
					this.tabHead = this.tabHead1;
					break;
				case '业务出房':
					this.tableTab = this.tableTab2;
					this.tabHead = this.tabHead2;
					break;
				case '业务收支':
					this.tableTab = this.tableTab3;
					this.tabHead = this.tabHead3;
					break;
				case '收房出房':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead4;
					break;
				case '租客':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead5;
					break;
				case '业主':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead6;
					break;
				case '按科目（汇总）':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead7;
					break;
				case '按科目（明细）':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead6;
					break;
				case '按月度':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead8;
					break;
				case '待收账单':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead4;
					break;
				case '待付账单':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead4;
					break;
				case '已完成收入':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead4;
					break;
				case '已完成支出':
					this.tableTab = this.tableTab4;
					this.tabHead = this.tabHead4;
					break;
			}
		}
	},
	created: function() {
		// 		if(this.tableData=='运营数据'){
		// alert(this.tableData)
		// 		}
		// 		console.log(this.tableData)
		switch (this.tableData) {
			case '运营数据':
				this.tableTab = this.tableTab1;
				this.tabHead = this.tabHead1;
				break;
			case '业务出房':
				this.tableTab = this.tableTab2;
				this.tabHead = this.tabHead2;
				break;
			case '业务收支':
				this.tableTab = this.tableTab3;
				this.tabHead = this.tabHead3;
				break;
			case '收房出房':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead4;
				break;
			case '租客':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead5;
				break;
			case '业主':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead6;
				break;
			case '按科目（汇总）':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead7;
				break;
			case '按科目（明细）':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead8;
				break;
			case '按月度':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead8;
				break;
			case '待收账单':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead4;
				break;
			case '待付账单':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead4;
				break;
			case '已完成收入':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead4;
				break;
			case '已完成支出':
				this.tableTab = this.tableTab4;
				this.tabHead = this.tabHead4;
				break;
		}
	}
};
</script>