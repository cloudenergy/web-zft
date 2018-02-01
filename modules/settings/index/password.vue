<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="手机号">
				<el-input v-model="form.verificationCode"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="重复密码">
				<el-input v-model="form.passwordAgain"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			form() {
				return {
					verificationCode:'',
					password:'',
					passwordAgain:''
				}
			}	
		},
		components: {

		}
	}
</script>

<style>
</style>