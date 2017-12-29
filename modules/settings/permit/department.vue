<template>
  <div class="partner">
    <el-col :span="2">
      <el-tree :data="tree" :expand-on-click-node='false' :default-expand-all='true' :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="20">
      <div class="all">
        <h3>{{subordinate.label}}-下级部门 <div><el-button>编辑本部门</el-button> <el-button>添加子部门</el-button></div></h3>
        <div class="tit">
          
          <el-col :span="3">
            <el-input v-model="search" placeholder="请输入内容"></el-input>
          </el-col>
        </div>
        <div>
        
          <el-table :data="subordinate.children" style="width: 100%">

            <el-table-column prop="label" label="下级部门">

            </el-table-column>

            <el-table-column prop="number" label="管辖套数">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
              </template>
            </el-table-column>

          </el-table>
        
        </div>
       
      </div>


      <div class="all">
        <h3>{{subordinate.label}}员工 <div><el-button>添加新员工</el-button></div></h3>
        <div class="tit">
          <el-col :span="3">
            <el-button @click="isShow=true" :type="isShow?'danger':''">在职</el-button>

            <el-button @click="isShow=false" :type="!isShow?'danger':''">离职</el-button>
          </el-col>
          <el-col :span="3">
            <el-input v-model="search" placeholder="请输入内容"></el-input>
          </el-col>
        </div>
        <div v-show="isShow">
        
          <el-table :data="tableStaff" style="width: 100%">

            <el-table-column prop="name" label="姓名">
            </el-table-column>

            <el-table-column prop="nub" label="编号">
            </el-table-column>

            <el-table-column prop="tel" label="电话">
            </el-table-column>

            <el-table-column prop="quarters" label="岗位">
            </el-table-column>

            <el-table-column prop="section" label="部门">
            </el-table-column>

            <el-table-column prop="administer" label="管辖范围">
            </el-table-column>

            <el-table-column prop="operate" label="操作">
            </el-table-column>

          </el-table>
          
        </div>
        <div v-show="!isShow">
          <el-table :data="tableStaff" style="width: 100%">

            <el-table-column prop="name" label="姓名">
            </el-table-column>

            <el-table-column prop="nub" label="编号">
            </el-table-column>

            <el-table-column prop="tel" label="电话">
            </el-table-column>

            <el-table-column prop="quarters" label="岗位">
            </el-table-column>

            <el-table-column prop="section" label="部门">
            </el-table-column>

            <el-table-column prop="administer" label="管辖范围">
            </el-table-column>

            <el-table-column prop="operate" label="操作">
            </el-table-column>
          </el-table>
          
        </div>
      </div>
    </el-col>

    <el-dialog>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
	data() {
		return {
			search: '',
			tableData2: '',
			isShow: true,
			tableData: [],
			search: '',
			subordinate: [],
			dialogVisible: false,
			selectedOptions: [],
			value: [],
			number: '0',
			postName: '',
			tableStaff: [],
			tree: [
				{
					label: '总部',
					staff: [{name:1}],
					children: [
						{
							label: '金沙湖',staff:[],
							children: [{ label: '22', staff: [] }]
						},
						{
							label: '金沙湖',
							number: 0,
							staff: [
								{
									name: '胡恒',
									nub: '',
									tel: '13858129096',
									quarters: '管理员',
									quarters: '总部',
									quarters: '所有',
									operate: '--'
                },
                {
									name: '张三',
									nub: '',
									tel: '13858129096',
									quarters: '管理员',
									quarters: '总部',
									quarters: '所有',
									operate: '--'
								}
							]
						}
					]
				}
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		};
	},
	methods: {
		handleNodeClick(data) {
      this.subordinate = data;
      // this.tableStaff=[];
      // for (let i = 0; i < data.staff.length; i++) {
       this.tableStaff=data.staff;
// console.log(this.tableStaff)
       
      // }
      console.log(data)
		}
	},
	created() {
		for (let i = 0; i < this.tree.length; i++) {
			this.subordinate = this.tree[0];
		}
	}
};
</script>

<style lang='less' scoped>
.partner {
	/deep/.addBtn {
		margin-top: 10px;
		width: 100%;
	}
	.dialog_tab_ul {
		label {
			width: 10%;
			float: left;
		}
		.dialog_tab_ul_checked {
			float: left;
			width: 80%;
		}
  }
  .all{
    margin-bottom: 30px;
    h3{
      div{
        float: right;
      }
    }
 .tit {
            float: left;
            width: 100%;
            background-color: #e0e7ec;
            padding: 10px 0;
            margin-top: 10px;
        }
  }
}
</style>