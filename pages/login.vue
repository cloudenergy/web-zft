<template>
	<div class="login">
		<div class="container">
			<!-- <h4>
				<span>登录</span>
			</h4> -->
			<div class="logo-image">
				<img src="~/static/imgs/logo.png" alt="">
			</div>
			<div class="lofin-form">
				<el-form status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
					<el-form-item prop="user.mobile">
						<el-input placeholder="账户" type="text" v-model="user.mobile" auto-complete="off" size="medium"></el-input>
					</el-form-item>
					<el-form-item prop="user.pass">
						<el-input placeholder="密码" type="password" v-model="user.pass" auto-complete="off" @keyup.native="keyLogin($event)" size="medium"></el-input>
					</el-form-item>
					<el-form-item prop="">
						<el-checkbox-group v-model="user.keepAlive" style="float:left">
							<el-checkbox label="记住密码" :key="30"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class="bottom-btn">
						<el-button style="width: 100%" type="primary" @click.native="login()" size="medium">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
			
		</div>
	</div>
</template>

<script>
	import {
		add,
		format
	} from '~/utils/date';
	import _ from 'lodash';
	export default {
		data() {
			return {
				user: {keepAlive:false},
				type:null
			};
		},
		methods: {
			keyLogin(el) {
				if(el.keyCode===13){
					this.login()
				}
			},
			login() {
				this.$store
					.dispatch('POST_LOGIN', {
						username: this.user.mobile,
						password: this.user.pass,
						keepAlive:this.user.keepAlive===true?30:2
					})
					.then(() => this.$store.dispatch('GET_ENVIRONMENTS'))
					.then(() => {
						if (this.$store.state.userInfo.successInfo === true) {
							this.$message.success('登陆成功')
							this.$router.push('/houses')
						} else {
							this.$message('账号或密码错误')
						}
					});
			}
		}
	};
</script>
<style lang="less" scoped>
	.login {
		width: 100%;
		height: 100%;
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');

		// h4 {
		// 	padding: 10px 0 0;
		// 	color: @dark;
		// 	text-align: center;

		// 	span {
		// 		display: inline-block;
		// 		letter-spacing: 20px;
		// 		text-indent: 20px;
		// 		border-bottom: 3px solid @primary;
		// 		padding-bottom: 10px;
		// 		margin-bottom: 20px;
		// 	}
		// }


		.container {
			width: 700px;
			height: 450px;
			background: #fff;
			box-shadow: 0 0 15px #999;
			border-radius: 8px;
			.logo-image {
				background: #F5F8FC;
				padding:20px 0;
				margin-bottom:60px;
			}
			.lofin-form{
				width: 300px;
				margin:0 auto;
			}
		}

		.bottom-btn {
			margin-bottom: 0px;

			button {
				box-shadow: 0 0 10px @primary;
			}
		}
	}
</style>


