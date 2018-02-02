<template>
	<el-form ref="form" label-width="100px" label-position="left">
		<p class="formTit">基本信息</p>
		<div style="margin-left:40px">
			<el-form-item label="登录账号">
				<el-col :span="10">
					<el-input v-model="form.username" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item :label='form.passwordName' v-if="form.passwordName!=='新密码'">
				<el-col :span="10" @click.native="changePassword">
					<el-input v-model="form.password" type="password"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item :label='form.passwordName' v-if="form.passwordName==='新密码'">
				<el-col :span="10">
					<el-input v-model="form.password" type="password"></el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="确认密码" v-if="form.passwordName==='新密码'">
				<el-col :span="10">
					<el-input v-model="form.passwordAgain" type="password"></el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="手机号">
				<el-col :span="10">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-col :span="10">
					<el-input v-model="form.email"></el-input>
				</el-col>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit" class="sel">保存</el-button>
			</el-form-item>
		</div>
	</el-form>
</template>

<script>
import md5 from 'js-md5';
export default {
	created() {
		this.form.passwordName = '登录密码';
		this.form.password = '12345678';
	},
	computed: {
		projectId() {
			return this.$store.state.user.projectId;
		}
	},
	created() {
		this.newForm();
	},
	data() {
		return {
			form: {
				username: '',
				password: '12345678'
			}
		};
	},
	methods: {
		changePassword() {
			this.$confirm('是否需要修改密码?否请点击取消', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.form.passwordName = '新密码';
					this.form.password = '';
				})
				.catch(err => {});
		},
		newForm() {
			this.form.username = JSON.parse(
				localStorage.getItem('user')
			).username;
			this.form.passwordName = '登录密码';
			this.form.email = JSON.parse(localStorage.getItem('user')).email;
			this.form.mobile = JSON.parse(localStorage.getItem('user')).mobile;
		},
		onSubmit() {
			console.log(this.form);
			if (this.form.password === '12345678') {
				this.$model('administrator_change')
					.patch(
						{ mobile: this.form.mobile, email: this.form.email },
						{
							projectId: this.projectId,
							id: JSON.parse(localStorage.getItem('user')).id
						}
					)
					.then(res => {
						this.$message.success('更改手机/邮箱成功');
						var updataUser = JSON.parse(
							localStorage.getItem('user')
						);
						updataUser.email = this.form.email;
						updataUser.mobile = this.form.mobile;
						localStorage.setItem(
							'user',
							JSON.stringify(updataUser)
						);
					});
			} else {
				if (this.form.password === this.form.passwordAgain) {
					if (this.form.password !== '') {
						this.$model('administrator_change')
							.patch(
								{
									password: md5(this.form.password),
									mobile: this.form.mobile,
									email: this.form.email
								},
								{
									projectId: this.projectId,
									id: JSON.parse(localStorage.getItem('user'))
										.id
								}
							)
							.then(res => {
								this.$message.success(
									'更改密码成功，请重新登录'
								);
								localStorage.removeItem('user');
								this.$router.replace('/login');
							});
					} else {
						this.$message('密码输入为空');
					}
				} else {
					this.$message('两次密码输入不一致');
				}
			}
		}
	}
};
</script>

<style scoped>
.formTit {
	background-color: #e0e7ec;
	line-height: 52px;
	padding-left: 20px;
	font-size: 14px;
	color: #000;
	border-top: none;
	margin-bottom: 10px;
}

form {
	background: #fff;
	padding-bottom: 10px;
	margin-bottom: 10px;
}

.el-input-group__prepend {
	width: 100px;
}

.el-radio-group {
	margin-left: 10px;
}

.sel {
	margin-left: 10px;
}

.change {
	color: #84aee7;
	font-size: 12px;
}
</style>
