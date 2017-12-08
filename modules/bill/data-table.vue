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

<el-dialog :title='dialogTitle' :visible.sync="dialog_collection">
	<P>应支付日:{{ tableData.data }} </P><P>金额:{{ tableData.rent }}</P>

<table>
	<thead>
		<tr>
			<td>111ßßßßß帐单类型</td>
			<td>费用周期</td>
			<td>单价</td>
			<td>应收(元)</td>
			<td>待收(元)</td>
			<td>待收(元)</td>
			<td>实收(元)</td>
			<td>余额(元)</td>
			<td>123(元)</td>
			<td>123(元)</td>
			
		</tr>
	</thead>
	<!-- <tr v-for='itme in table_collection'>
		<td>{{itme.bill_type}}</td>
		<td>{{itme.bill_cycle}}</td>
		<td>{{itme.bill_unit}}</td>
		<td>{{itme.bill_receivable}}</td>
		<td>{{itme.bill_dueIn}}</td>
		<td>{{itme.bill_ealPrice}}</td>
		<td>wqe</td> -->
		<!-- <td>{{key}}</td> -->
	</tr>
</table>

  <!-- <el-table :data="table_collection"> -->
	  						

    <!-- <el-table-column property="bill_type" label="帐单类型"></el-table-column>
    <el-table-column property="bill_cycle" label="费用周期"></el-table-column>
    <el-table-column property="bill_unit" label="单价"></el-table-column>
    <el-table-column property="bill_receivable" label="应收(元)" width="200"></el-table-column>
    <el-table-column property="bill_dueIn" label="待收(元)" width="200"></el-table-column>
    <el-table-column property="bill_ealPrice" label="实收(元)" width="200"></el-table-column>
    <el-table-column property="bill_balance" label="c" width="200"></el-table-column> -->
	
  <!-- </el-table> -->
</el-dialog>
	<!-- 编辑 -->
<el-dialog :title='dialogTitle' :visible.sync="dialog_edit">
	<!-- <P>应支付日:{{ scope.row.date }} </P><P>金额:{{ scope.row.rent }}</P> -->
  <el-table :data="table_collection">
	  						

    <el-table-column property="bill_type" label="帐单类型" width="150"></el-table-column>
    <el-table-column property="bill_cycle" label="费用周期" width="200"></el-table-column>
    <el-table-column property="bill_unit" label="单价"></el-table-column>
    <el-table-column property="bill_receivable" label="应收(元)" width="200"></el-table-column>
    <el-table-column property="bill_dueIn" label="待收(元)" width="200"></el-table-column>
    <el-table-column property="bill_ealPrice" label="实收(元)" width="200"></el-table-column>
    <el-table-column property="bill_balance" label="余额(元)" width="200"></el-table-column>
	
  </el-table>
</el-dialog>

	<!-- 备注 -->
<el-dialog :title='dialogTitle' :visible.sync="dialog_remark">
	<!-- <P>应支付日:{{ dataT.row.date }} </P><P>金额:{{ scope.row.rent }}</P> -->
  <el-table :data="table_collection">
	  						

    <el-table-column property="bill_type" label="帐单类型" width="150"></el-table-column>
    <el-table-column property="bill_cycle" label="费用周期" width="200"></el-table-column>
    <el-table-column property="bill_unit" label="单价"></el-table-column>
    <el-table-column property="bill_receivable" label="应收(元)" width="200"></el-table-column>
    <el-table-column property="bill_dueIn" label="待收(元)" width="200"></el-table-column>
    <el-table-column property="bill_ealPrice" label="实收(元)" width="200"></el-table-column>
    <el-table-column property="bill_balance" label="余额(元)" width="200"></el-table-column>
	
  </el-table>
</el-dialog>

	<!-- 改期 -->
<el-dialog :title='dialogTitle' :visible.sync="dialog_take_a_rain_check">
	<!-- <P>应支付日:{{ scope.row.date }} </P><P>金额:{{ scope.row.rent }}</P> -->
  <el-table :data="table_collection">
	  						

    <el-table-column property="bill_type" label="帐单类型" width="150"></el-table-column>
    <el-table-column property="bill_cycle" label="费用周期" width="200"></el-table-column>
    <el-table-column property="bill_unit" label="单价"></el-table-column>
    <el-table-column property="bill_receivable" label="应收(元)" width="200"></el-table-column>
    <el-table-column property="bill_dueIn" label="待收(元)" width="200"></el-table-column>
    <el-table-column property="bill_ealPrice" label="实收(元)" width="200"></el-table-column>
    <el-table-column property="bill_balance" label="余额(元)" width="200"></el-table-column>
	
  </el-table>
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
					bill_type: '常规押金',
					bill_cycle: '2017-07-01 至 2017-12-31',
					bill_unit: '-',
					bill_receivable: '1,000.00',
					bill_dueIn: '1,000.00',
					bill_ealPrice: '1,000.00',
					// bill_balance: '暂无余额'
				},
				{

					bill_type: '常规押金',
					bill_cycle: '2018-07-01 至 2018-12-31',
					bill_unit: '-',
					bill_receivable: '1,000.00',
					bill_dueIn: '1,000.00',
					bill_ealPrice: '2,000.00',
					// bill_balance: '暂无余额'
				}
			],
			dialog_collection:false,
			dialog_edit:false,
			dialog_remark:false,
			dialog_take_a_rain_check:false,
		};
	},
	methods: {
		handleEdit(index, row) {
			this.dialog_collection = true;
			this.dialogTitle = '编辑账单';
			console.log(index, row);
		},
		handleReceive(index, row) {
			this.dialog_edit= true;
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
			this.dialogTitle = '账单改期';
			console.log(index, row);
		},
		handleClose(done) {
			this.$confirm('Are you sure to close this dialog?')
				.then(() => {
					done();
				})
				.catch(() => {});
		}
	}
};
</script>