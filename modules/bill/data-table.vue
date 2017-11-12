<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="最后缴费日期" width="180">
                <template slot-scope="scope">
                    <p style="margin-left: 10px;color:red">{{ scope.row.overdue }}</p>
                    <p style="margin-left: 10px">{{ scope.row.date }}</p>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="120">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.name }}
                            <i class="el-icon-phone"></i>
                        </span>
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
            <el-table-column label="账号/余额(¥)" width="120">
                <template slot-scope="scope">
                    <p style="margin-left: 10px">{{ scope.row.rent }}</p>
                    <p style="margin-left: 10px;color:grey">{{ scope.row.rentDesc }}</p>
                </template>
            </el-table-column>
            <el-table-column label="Operations" width="120">
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>This is a message</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			dialogVisible: false,
    			dialogTitle: "Tips",
    			tableData: [
    				{
    					overdue: "逾期63天",
    					date: "2016-05-03",
    					name: "郭德纲",
    					rent: 1200,
    					phone: "1300000001",
    					rentDesc: "租金6期",
    					address: "朝晖三区·2栋2单元201室·B2017-07-01 → 2017-07-31"
    				},
    				{
    					overdue: "逾期62天",
    					date: "2016-05-02",
    					name: "老刘",
    					rent: 122,
    					rentDesc: "押金",
    					phone: "1300000002",
    					address: "龙湖滟澜山·8栋2单元203室·G2017-08-01 → 2017-08-20"
    				},
    				{
    					overdue: "逾期61天",
    					date: "2016-05-04",
    					name: "冰儿",
    					rent: 2200,
    					rentDesc: "租金11期",
    					phone: "1300000003",
    					address: "朝晖三区·3栋3单元301室·改哎的名字2017-08-22 → 2017-11-21"
    				},
    				{
    					overdue: "",
    					date: "2016-05-01",
    					name: "不是整天 ",
    					rent: 200,
    					rentDesc: "押金",
    					phone: "1300000004",
    					address:
    						"保利香槟国际·2栋2单元2室·这个名字很长啊这个字啊这个名字很长啊这个名字很长啊这个名字很长啊2017-10-12 → 2018-04-11"
    				}
    			]
    		};
    	},
    	methods: {
    		handleEdit(index, row) {
    			this.dialogVisible = true;
    			this.dialogTitle = "编辑账单";
    			console.log(index, row);
    		},
    		handleReceive(index, row) {
    			this.dialogVisible = true;
    			this.dialogTitle = "处理账单";
    			console.log(index, row);
    		},
    		addComment(index, row) {
    			this.dialogVisible = true;
    			this.dialogTitle = "添加备注";
    			console.log(index, row);
    		},
    		changeDate(index, row) {
    			this.dialogVisible = true;
    			this.dialogTitle = "账单改期";
    			console.log(index, row);
    		},
    		handleClose(done) {
    			this.$confirm("Are you sure to close this dialog?")
    				.then(_ => {
    					done();
    				})
    				.catch(_ => {});
    		}
    	}
    };
</script>