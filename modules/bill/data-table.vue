<template>
    <div>
        <el-table :data="tableBill" style="width: 100%">
            <el-table-column label="应支付日">
                <template slot-scope="scope">
                    <p style="margin-left: 10px;color:red">{{ scope.row.overdue }}</p>
                    <p style="margin-left: 10px">{{ scope.row.dueDateTime }}</p>
                </template>
            </el-table-column>
            <el-table-column label="住户姓名/帐号">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <i class="el-icon-phone"></i>
                        <span size="medium">{{ scope.row.user.name }}</span>
                        <p style="margin-left: 10px">{{ scope.row.user.accountName }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="房源/租期">
                <template slot-scope="scope">
                    <p>{{ scope.row.room.locationName }}{{ scope.row.room.building }}{{ scope.row.room.unit }}{{ scope.row.room.roomNumber }}&nbsp;{{ scope.row.room.roomName }}</p>
					<p>{{scope.row.startDateTime}}至{{scope.row.endDateTime}}</p>
                </template>
            </el-table-column>
            <el-table-column label="金额(¥)/账期">
                <template slot-scope="scope">
                    <p style="margin-left: 10px">{{ narrow(scope.row.dueAmount) }}</p>
                    <p style="margin-left: 10px;color:grey" v-for="item in type" :key="item.type" v-if="scope.row.type===item.type">{{ item.text }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
    </div>
</template>

<script>
export default {
	props: {
		pagingSize:{
			type:Object
		},
		tableBill:{
			type:Array
		}
	},
	computed: {
		projectId(){
			return this.$store.state.user.projectId
		},
		
	},
	data() {
		return {
			tableData:[],
			paging:null,
			dialogVisible: false,
			dialogTitle: 'Tips',
			type:[
				{type:'bond',text:'押金'},
				{type:'deposit',text:'定金'},
				{type:'rent',text:'租金'},
				{type:'extra',text:'加收'},
				{type:'bond-refund',text:'退押金'},
				{type:'deposit-refund',text:'退定金'},
				{type:'rent-refund',text:'退租金'},
				{type:'extra-refund',text:'退加收'},
			]
		};
	},
	methods: {
		/**@augments
		 * max 传入实收最大的值
		 * num 实收的值
		 */
		narrow(data) {
			return data/100
		}
	}
};
</script>
<style scoped>
    .table_collection2 {
    	margin-top: 20px;
    }
    .input3 {
    	margin-top: 20px;
    }
   
</style>
