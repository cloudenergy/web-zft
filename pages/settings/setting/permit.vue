<template>
	<div class="all">
		<h3>全部员工({{tableData.length}}人)</h3>
		<div class="tit">
			<el-col :span="3" style="margin-left:20px">
				<el-button class="addBtn" size="medium" @click="addJobs">添加岗位</el-button>
			</el-col>
		</div>
		<div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="" label="" width='20'>
				</el-table-column>
				<el-table-column prop="username" label="姓名">
				</el-table-column>

				<el-table-column prop="mobile" label="手机号">
				</el-table-column>

				<el-table-column prop="email" label="邮箱">
				</el-table-column>

				<el-table-column prop="level" label="岗位">
					<template slot-scope="scope">
						<span v-if="scope.row.level==='MANAGER'">管理员</span>
						<span v-if="scope.row.level==='ADMIN'">ADMIN</span>
					</template>
				</el-table-column>

				<el-table-column prop="section" label="部门">
				</el-table-column>

				<el-table-column prop="administer" label="管辖范围">
				</el-table-column>

				<el-table-column prop="operate" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" @click="editorUser(scope.row)">编辑</el-button>
						<el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
		<el-dialog title="提示" :visible.sync="addSteward" width="30%">
			<el-form ref="addStewardForm" :model="addStewardForm" label-width="80px" :rules="rules">
				<el-form-item label="姓名">
					<el-input v-model="addStewardForm.username" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="addStewardForm.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="账户密码" prop="pass">
					<el-input v-model="password" placeholder="密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input v-model="passwordAgain" placeholder="" type="password"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="addStewardForm.level" placeholder="请选择">
						<el-option value="manager" label="管家"></el-option>
						<el-option value="accountant" label="财务"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电子邮件">
					<el-input v-model="addStewardForm.email" placeholder="电子邮件"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addSteward = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="资料修改" :visible.sync="editorSteward" width="30%">
			<el-form ref="addStewardForm" :model="editorUserInfo" label-width="80px" :rules="rules">
				<el-form-item label="姓名">
					<el-input v-model="editorUserInfo.username" placeholder="管家姓名" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="editorUserInfo.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="账户密码" prop="pass">
					<el-input v-model="password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input v-model="passwordAgain" placeholder="请重复输入密码"></el-input>
				</el-form-item>
				<el-form-item label="电子邮件">
					<el-input v-model="editorUserInfo.email" placeholder="电子邮件"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editorSteward = false">取 消</el-button>
				<el-button type="primary" @click="editor">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	export default {
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			}
		},
		data() {
			var checkPassword = (rule, value, callback) => {
				if (this.password === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.passwordAgain !== '') {
						this.$refs.addStewardForm.validateField('checkPass');
					}
					callback();
				}
			};
			var checkPasswordAgain = (rule, value, callback) => {
				if (this.passwordAgain === '') {
					callback(new Error('请再次输入密码'));
				} else if (this.passwordAgain !== this.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				addSteward: false,
				editorSteward: false,
				editorUserInfo: '',
				addStewardForm: {
					username: '',
					level: '',
					password: '',
					email: '' //
				},
				tableData: [],
				password: '',
				passwordAgain: '',
				rules: {
					pass: [{
						validator: checkPassword,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: checkPasswordAgain,
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.query();
		},
		components: {},
		methods: {
			editor() {
				this.editorSteward = false
				this.$refs['addStewardForm'].validate((valid) => {
					if (valid) {
						var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
						if (regex.test(this.editorUserInfo.email)) {
							this.editorUserInfo.password = md5(this.password);
							this.$model('administrator_change')
								.patch({
									mobile: this.editorUserInfo.mobile,
									email: this.editorUserInfo.email,
									password:this.editorUserInfo.password
								}, {
									projectId: this.projectId,
									id: this.editorUserInfo.id
								})
								.then(res => {
									this.$message.success('信息更改成功');
									this.query()
								})
								.catch(err=>{
									this.$message('信息更改失败')
								})
						} else {
							this.$message('邮箱格式错误');
						}
					} else {
						return false;
					}
				})
			},
			editorUser(data) {
				if (JSON.parse(localStorage.getItem('user')).level === 'ADMIN') {
					this.$set(this,'editorUserInfo',data)
					this.editorSteward = true
				} else {
					this.$message('权限不足，无法编辑资料');
				}
			},
			addJobs() {
				if (JSON.parse(localStorage.getItem('user')).level === 'ADMIN') {
					this.addSteward = true;
				} else {
					this.$message('权限不足，无法添加岗位');
				}
			},
			add() {
				this.$refs['addStewardForm'].validate((valid) => {
					if (valid) {
						var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
						if (regex.test(this.addStewardForm.email)) {
							this.addSteward = false;
							this.addStewardForm.password = md5(this.password);
							this.$model('credentials')
								.create(this.addStewardForm, {
									projectId: this.projectId
								})
								.then(res => {
									this.$message.success('创建成功');
									this.addStewardForm.username = this.addStewardForm.password = this.password = this.addStewardForm.email = '';
									this.query()
								})
								.catch(err => {
									if (err.code === 90000004) {
										this.$message('权限不足,创建失败');
									}
								});
						} else {
							this.$message('邮箱格式错误');
						}
					} else {
						return false;
					}
				})
			},
			query() {
				this.$model('credentials')
					.query({}, {
						projectId: this.projectId
					})
					.then(res => {
						if (
							JSON.parse(localStorage.getItem('user')).level ===
							'ADMIN'
						) {
							this.$set(this, 'tableData', res || []);
						}
					});
			},
			deleteUser(data) {
				if (
					data.username === JSON.parse(localStorage.getItem('user')).usernmae
				) {
					this.$message('不可以删除自己的账号');
				} else {
					this.$confirm('将删除此管理员, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						})
						.then(() => {
							this.$model('administrator_change')
								.delete({}, {
									projectId: this.projectId,
									id: data.id
								})
								.then(res => this.query());
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
				}
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