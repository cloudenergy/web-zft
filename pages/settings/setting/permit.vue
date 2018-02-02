<template>
	<div class="all">
		<h3>全部员工({{tableData.length}}人)</h3>
		<div class="tit">
			<el-col :span="3" style="margin-left:20px">
				<el-button class="addBtn" size="medium" @click="addSteward=true">添加岗位</el-button>
			</el-col>
		</div>
		<!-- TODO ZHOUYI  邮箱和手机号返回 -->
		<div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="" label="" width='20'>
				</el-table-column>
				<el-table-column prop="username" label="姓名">
				</el-table-column>

				<el-table-column prop="nub" label="手机号">
				</el-table-column>

				<el-table-column prop="email" label="邮箱">
				</el-table-column>

				<el-table-column prop="quarters" label="岗位">
				</el-table-column>

				<el-table-column prop="section" label="部门">
				</el-table-column>

				<el-table-column prop="administer" label="管辖范围">
				</el-table-column>

				<el-table-column prop="operate" label="操作">
					<template slot-scope="scope">
						<el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</div>
		<el-dialog title="提示" :visible.sync="addSteward" width="30%">
			<el-form ref="addStewardForm" :model="addStewardForm" label-width="80px">

				<el-form-item label="管家姓名">
					<el-input v-model="addStewardForm.username" placeholder="管家姓名"></el-input>
				</el-form-item>
				<el-form-item label="账户密码">
					<el-input v-model="password" placeholder="密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="addStewardForm.level" placeholder="请选择">
						<el-option value="manager" label="管家"></el-option>
						<el-option value="accountant" label="财务"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电子邮件">
					<el-input v-model="addStewardForm.email" placeholder="电子邮件" type="email"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addSteward = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	export default {
		computed: {
			projectId () {
				return this.$store.state.user.projectId
			}	
		},
		data() {
			return {
				addSteward:false,
				addStewardForm: {
					username: '',
					level: '',
					password:'',
					email: '' //TODO: 必须提供email
				},
				tableData:[],
				password:''
			};
		},
		created () {
			this.query()	
		},
		components: {},
		methods: {
			add() {
				var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
				if ( regex.test( this.addStewardForm.email ) ){
					this.addSteward = false;
					this.addStewardForm.password = md5(this.password);
					this.$model('credentials')
					.create(this.addStewardForm, {
						projectId: this.projectId
					})
					.then(res=>{
							this.$message.success('创建成功')
							this.addStewardForm.username=this.addStewardForm.password=this.password=this.addStewardForm.email=''
						}
					)
					.catch(err=>{
						if(err.code===90000004){
							this.$message('权限不足,创建失败')
						}
					})
				}else{
					this.$message('邮箱格式错误')
				}
			},
			query() {
				this.$model('credentials')
				.query({}, { projectId: this.projectId })
				.then(res => {
					this.$set(this, 'tableData', res || [])
				});
			},
			deleteUser(data) {
				console.log(data)
				this.$model('administrator_change')
				.delete({},{projectId:this.projectId,id:data.id})
				.then(res=>console.log(res))
			}
		}
	};
</script>

<style lang='less' scoped>
	.all {
		.tit {
			float: left;
			width: 100%;
			background-color: #e0e7ec;
			padding: 10px 0;
			margin-top: 10px;
		}
	}
</style>