<template>
	<el-form ref="form" label-width="100px" label-position="left">
		<p class="formTit">基本信息</p>
		<div style="margin-left:40px">
			<el-form-item label="登录账号">
				<el-col :span="10">
					<el-input v-model="form.username" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item :label='form.passwordName'>
				<el-col :span="10">
					<el-input v-model="form.password" type="password" @focus="changePassword"></el-input>
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
			<!-- TODO ZHOUYI  邮箱和手机号返回 -->
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
	import md5 from 'js-md5'
	export default {
		created() {
			this.form.passwordName = '登录密码'
			this.form.password = '12345678'
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId
			}
		},
		created () {
			this.newForm()	
		},
		data() {
			return {
				form: {
					username:'',
					password:"12345678"
				}
			}
		},
		methods: {
			changePassword() {
				this.form.passwordName = '新密码'
				this.form.password = ''
			},
			newForm() {
				this.form.username = JSON.parse(localStorage.getItem('user')).username
				this.form.passwordName = '登录密码'
			},
			onSubmit() {
				// todo suoqin credentials is undefined
				if(this.form.password===this.form.passwordAgain){
					this.$model('administrator_change')
					.patch({password:md5(this.form.password),mobile:this.form.mobile,email:this.form.email},{projectId:this.projectId,id:7})
					.then(res=>{
						console.log(res)
					})
				}
				
			}
		}
	}
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
		color: #84AEE7;
		font-size: 12px
	}
</style>