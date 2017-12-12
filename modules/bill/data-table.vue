<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="应支付日" width="180">
				<template slot-scope="scope">
					<p style="margin-left: 10px;color:red">{{ scope.row.overdue }}</p>
					<p style="margin-left: 10px">{{ scope.row.date }}</p>
				</template>
			</el-table-column>
			<el-table-column label="住户姓名/帐号" width="120">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						 <i class="el-icon-phone"></i>
                        <span size="medium">{{ scope.row.name }}</span>
						<p style="margin-left: 10px">{{ scope.row.phone }}</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="房源/租期">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>Name: {{ scope.row.name }}</p>
						<p>Addr: {{ scope.row.address }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.address }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="金额(¥)/账期" width="120">
				<template slot-scope="scope">
					<p style="margin-left: 10px">{{ scope.row.rent }}</p>
					<p style="margin-left: 10px;color:grey">{{ scope.row.rentDesc }}</p>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template slot-scope="scope">
					<el-dropdown>
						<el-button type="primary" size="mini" @click.native="handleReceive(scope.$index, scope.row)">
							收款
							<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)">编辑</el-dropdown-item>
							<el-dropdown-item @click.native="addComment(scope.$index, scope.row)">备注</el-dropdown-item>
							<el-dropdown-item @click.native="changeDate(scope.$index, scope.row)">改期</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<!-- <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>This is a message</span>
			<span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
		</el-dialog> -->

<!-- 收款 -->

<el-dialog :title='dialogTitle' :visible.sync="dialog_collection" width="80%" class="dialog_collection">
	<!-- <P><span>应支付日:{{ tableData.data }}</span> <span>金额:{{ tableData.rent }}</span></P> -->


<!-- <table>
	<thead>
		<tr>
			<td>帐单类型</td>
			<td>费用周期</td>
			<td>单价</td>
			<td>应收(元)</td>
			<td>待收(元)</td>
			<td>实收(元)</td>
			<td>余额(元)</td>
		</tr>
	</thead>
	<tbody>
		<tr v-for='item in table_collection'>
			<td>{{item.bill_type}}</td>
			<td>{{item.bill_cycle}}</td>
			<td>{{item.bill_receivable}}</td>
			<td>{{item.bill_dueIn}}</td>
			<td>{{item.bill_dueIn-bill_ealPrice}}</td>
			<td><input type="number" v-model='bill_ealPrice' v-on:input='ealOrice(item.bill_dueIn,bill_ealPrice)'></td>
			<td>余{{bill_balance}}</td>
			
		</tr>
	</tbody>
</table> -->


  <el-table :data="table_collection">
	  						

    <el-table-column property="bill_type" label="帐单类型"></el-table-column>
    <el-table-column property="bill_cycle" label="费用周期" width="200"></el-table-column>
    <el-table-column property="bill_unit" label="单价"></el-table-column>
    <el-table-column property="bill_receivable" label="应收(元)" width="200"></el-table-column>
    <el-table-column property="bill_dueIn" label="待收(元)" width="200"></el-table-column>
    <el-table-column property="bill_ealPrice" label="实收(元)" width="200"></el-table-column>
    <el-table-column property="bill_balance" label="余额(元)" width="200"></el-table-column>
	
  </el-table>

<el-table :data="table_collection2" class="table_collection2">
	<el-table-column property='table_collection2_data'  label="实际支付时间"></el-table-column>
    <el-table-column property="bill_cycle" label="支付方式">
		<template slot-scope="scope">
			<el-select v-model="table_collection2_pay_val" placeholder="请选择">
    <el-option
      v-for="item in table_collection2.table_collection2_pay"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
		</template>
	</el-table-column>
    <el-table-column property="bill_unit" label="经办人">
		<template slot-scope="scope">
			<el-select v-model="table_collection2_name_val" placeholder="请选择">
    <el-option
      v-for="item2 in table_collection2.table_collection2_name"
      :key="item2"
      :label="item2"
      :value="item2">
    </el-option>
  </el-select>
		</template>
	</el-table-column>
    <el-table-column property="bill_balance" label="备注">
		<template slot-scope="scope">
		<el-input type='textarea'></el-input>
		</template>
	</el-table-column>
</el-table>
<el-input placeholder="请输入内容" v-model="input3" class="input3">
    <template slot="prepend">
		账单备注
	</template>
  </el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_collection = false">取 消</el-button>
    <el-button type="primary" @click="dialog_collection = false">确 定</el-button>
  </span>
</el-dialog>
	<!-- 编辑 -->
<el-dialog :title='dialogTitle' :visible.sync="dialog_edit" width='80%'>
	<!-- <P>应支付日:{{ scope.row.date }} </P><P>金额:{{ scope.row.rent }}</P> -->
  <el-table :data="table_collection">
	  						

    <el-table-column property="bill_type" label="帐单22类型"></el-table-column>
    <el-table-column property="bill_cycle" label="费用周期"></el-table-column>
    <el-table-column property="bill_unit" label="单价"></el-table-column>
    <el-table-column property="bill_receivable" label="应收(元)"></el-table-column>
    <el-table-column property="bill_dueIn" label="待收(元)"></el-table-column>
    <el-table-column property="bill_ealPrice" label="实收(元)"></el-table-column>
    <el-table-column label="余额(元)">
		<template slot-scope="scope">
			<el-input
			v-model="dialog_edit_v"
			placeholder='请输入要收取的金额'
			clearable
			type="number"
			@input="editInput(scope.row.bill_dueIn)">
			</el-input>
			<span>{{edit_msg}}</span>
		</template>
	</el-table-column>
    <el-table-column label="操作">
		<template slot-scope="scope">
		<el-button @click='openMsg(scope.$index)'>x</el-button>
		</template>
	</el-table-column>
	
  </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_edit = false">取 消</el-button>
    <el-button type="primary" @click="dialog_edit = false">确 定</el-button>
  </span>
</el-dialog>

	<!-- 备注 -->
<el-dialog :title='dialogTitle' :visible.sync="dialog_remark" width='30%'>
	<!-- <P>应支付日:{{ dataT.row.date }} </P><P>金额:{{ scope.row.rent }}</P> -->
  <el-form>
	  <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="billTextarea">
</el-input>
	  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_remark = false">取 消</el-button>
    <el-button type="primary" @click="dialog_remark = false">确 定</el-button>
  </span>
</el-dialog>

	<!-- 改期 -->
<el-dialog :title='dialogTitle' :visible.sync="dialog_take_a_rain_check" width='20%'>
	<!-- <P>应支付日:{{ scope.row.date }} </P><P>金额:{{ scope.row.rent }}</P> -->
	<el-form>
  <el-date-picker
      v-model="billData"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
	</el-form>
	<span slot="footer" class="dialog-footer">
    <el-button @click="dialog_take_a_rain_check = false">取 消</el-button>
    <el-button type="primary" @click="dialog_take_a_rain_check = false">确 定</el-button>
  </span>
</el-dialog>

	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: false,
			dialogTitle: 'Tips',
			// dialog_collection: true,
			tableData: [
				{
					overdue: '逾期63天',
					date: '2016-05-03',
					name: '郭德纲',
					rent: 1200,
					phone: '1300000001',
					rentDesc: '租金6期',
					address: '朝晖三区·2栋2单元201室·B2017-07-01 → 2017-07-31'
				},
				{
					overdue: '逾期62天',
					date: '2016-05-02',
					name: '老刘',
					rent: 122,
					rentDesc: '押金',
					phone: '1300000002',
					address: '龙湖滟澜山·8栋2单元203室·G2017-08-01 → 2017-08-20'
				},
				{
					overdue: '逾期61天',
					date: '2016-05-04',
					name: '冰儿',
					rent: 2200,
					rentDesc: '租金11期',
					phone: '1300000003',
					address: '朝晖三区·3栋3单元301室·改哎的名字2017-08-22 → 2017-11-21'
				},
				{
					overdue: '',
					date: '2016-05-01',
					name: '不是整天 ',
					rent: 200,
					rentDesc: '押金',
					phone: '1300000004',
					address:
						'保利香槟国际·2栋2单元2室·这个名字很长啊这个字啊这个名字很长啊这个名字很长啊这个名字很长啊2017-10-12 → 2018-04-11'
				}
			],
			table_collection: [
				{
					index: 0,
					bill_type: '常规押金',
					bill_cycle: '2017-07-01 至 2017-12-31',
					bill_unit: '-',
					bill_receivable: '1000',
					bill_dueIn: '1000',
					bill_ealPrice: '1000',
					bill_balance: '暂无余额'
				}
			],
			dialog_collection: false,
			dialog_edit: false,
			dialog_remark: false,
			dialog_take_a_rain_check: false,
			// 余额
			bill_balance: '',
			// 待收
			bill_dueIn: '',
			// 实收
			bill_ealPrice: '',
			// 改期
			billData: '',
			// 备注
			billTextarea: '',
			table_collection2: [
				{
					table_collection2_data: '2017-12-09 14:54:21',
					table_collection2_pay: [
						'现金',
						'转账',
						'微信',
						'支付宝',
						'刷卡',
						'其他'
					],
					table_collection2_name: ['x', 'h']
				}
			],
			table_collection2_name_val: '',
			table_collection2_pay_val: '',
			input3: '',
			dialog_edit_v: '',
			edit_msg: ''
		};
	},
	methods: {
		/**@augments
		 * max 传入实收最大的值
		 * num 实收的值
		 */

		ealOrice(max, num) {
			if (this.bill_ealPrice > max) {
				this.bill_ealPrice = max;
			}
			console.log(this.bill_ealPrice);
			console.log(max);
			return (this.bill_ealPrice = num);
		},
		handleEdit(index, row) {
			this.dialog_edit = true;
			this.dialogTitle = '编辑账单';
			console.log(index, row);
		},
		handleReceive(index, row) {
			this.dialog_collection = true;
			this.dialogTitle = '处理账单';
			console.log(index, row);
		},
		addComment(index, row) {
			this.dialog_remark = true;
			this.dialogTitle = '添加备注';
			console.log(index, row);
		},
		changeDate(index, row) {
			this.dialog_take_a_rain_check = true;
			this.dialogTitle = '修改应支付日';
			console.log(index, row);
		},
		handleClose(done) {
			this.$confirm('Are you sure to close this dialog?')
				.then(() => {
					done();
				})
				.catch(() => {});
		},
		editInput(rowNub) {
			let edit_v = parseFloat(this.dialog_edit_v);
			let row_nub = parseFloat(rowNub);

	

			if (edit_v > row_nub) {
				this.edit_msg = '加收' + (edit_v - row_nub);
			} else if (edit_v < row_nub) {
				this.edit_msg = '减免' + (row_nub - edit_v);
			} else {
				this.edit_msg = '';
			}
			console.log(typeof edit_v)
		},
		edit_remove(index) {
			this.table_collection.splice(index, 1);
		},
		openMsg(index) {
			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.edit_remove();
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			// console.log(this.$message)
		}
	}
};
</script>
<<style>
.table_collection2{
	margin-top:20px;
}
.input3{
	margin-top:20px;
}
/* .dialog_collection table{
width:80%;
border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
}
.dialog_collection table  td{
	border-left: 1px solid #ccc;
	border-top: 1px solid #ccc;
	text-align: center;
} */
</style>
