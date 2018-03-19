<template>
	<div class="partner">
		<el-col :span="2">
			<el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			<el-button class="addBtn" size="medium" @click="addSteward=true">添加岗位</el-button>
		</el-col>
		<el-col :span="20">
			<component :is="currentView"></component>
		</el-col>

		<el-dialog title="添加岗位" :visible.sync="addSteward" width="30%">
			<el-form ref="addStewardForm" :model="addStewardForm" label-width="80px" :rules="rules" >

				<el-form-item label="姓名">
					<el-input v-model="addStewardForm.username" placeholder="管家姓名"></el-input>
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

	</div>
</template>

<script>
	import Root from './role/root';
	import All from './role/all';
	import Medics from './role/medics';
	import md5 from 'js-md5';
	export default {
		components: {
			Root,
			All,
			Medics
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm2.checkPass !== '') {
						this.$refs.addStewardForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				addSteward: false,
				addStewardForm: {
					username: '',
					level: '',
					password: '',
					email: '',
					passwordAgain: ''
				},
				dialogVisible: false,
				password: '',
				currentView: 'all',
				selectedOptions: [],
				value: [],
				number: '0',
				postName: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
			};
		},
		methods: {
			handleNodeClick(data) {
				this.currentView = data.index;
			},
			add() {
				this.addSteward = false;
				this.addStewardForm.password = md5(this.password);
				this.$model('credentials')
					.create(this.addStewardForm, {
						projectId: this.projectId
					})
					.then(res => {
						if (res.status != 200) {
							this.$message('创建失败')
						} else {
							this.$message.success('创建成功')
							this.addStewardForm.username = this.addStewardForm.password = this.password = ''
						}
					})
			}
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId;
			}
		},

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
	}
</style>