<template>
    <div class="all">
        <h3>卫生员({{tableData.length}}人) <div><el-button>编辑岗位</el-button><el-button @click="addSteward=true">添加员工</el-button></div></h3>
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
        <el-table  v-if="tableData.length!=0" :data="tableData" style="width: 100%">

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
        <el-table v-else>
            暂无数据
        </el-table>
</div>
<div v-show="!isShow">
<el-table v-if="tableData2.length!=0" :data="tableData2" style="width: 100%">

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
        <el-table v-else>
            暂无数据
        </el-table>
        </div>
       <el-dialog
  title="提示"
  :visible.sync="addSteward"
  width="30%">
 <el-form ref="addStewardForm" :model="addStewardForm" label-width="80px">

     <el-form-item label="管家姓名">
<el-input v-model="addStewardForm.username" placeholder="管家姓名"></el-input>
     </el-form-item>

     <el-form-item label="权限">
<el-select v-model="addStewardForm.level" placeholder="请选择">
      <el-option value="manager" label="管家"></el-option>
      <el-option value="accountant" label="财务"></el-option>
    </el-select>
     </el-form-item>
  <!-- <el-form-item label="姓名">
 <el-input placeholder="管家姓名" v-model="stewardName" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="男" value="man"></el-option>
      <el-option label="女" value="woman"></el-option>
    </el-select>
  </el-input>
  </el-form-item>
  <el-form-item label="编号">
<el-input placeholder="员工编号" v-model="stewardNub"></el-input>
  </el-form-item>
  <el-form-item label="部门">

  </el-form-item>
  <el-form-item label="岗位">
<el-select>
    
</el-select>
  </el-form-item>
  <el-form-item label="登录手机号">
<el-input placeholder="手机号码" v-model="stewardTel" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="+86" value="+86"></el-option>
    </el-select>
  </el-input>
  </el-form-item>
  <el-form-item label="登录密码">
<el-input v-model="stewardPassWord" placeholder="登录密码" type="password"></el-input>
      
  </el-form-item> -->
 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addSteward = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
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
			addSteward: true,
			stewardName: '',
			stewardName: '',
			stewardTel: '',
			stewardPassWord: '',
			addStewardForm: {
				username: '',
				level: ''
			}
		};
	},
	computed: {
		projectId() {
			return this.$store.state.user.projectId;
		}
	},
	created() {
		// this.query();
	},
	methods: {
		add() {
			this.addSteward = false;
			this.$model('credentials').create(this.addStewardForm, {
    			projectId: this.projectId
    		});
		}
	},
	components: {}
};
</script>

<style lang='less' scoped>
.all {
	h3 {
		div {
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
</style>