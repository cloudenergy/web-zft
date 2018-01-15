<template>
    <div class="login">
        <div class="container">
            <h4>
                <span>登录</span>
            </h4>
            <el-form status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
                <el-form-item prop="user.mobile">
                    <el-input placeholder="账户" type="text" v-model="user.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="user.pass">
                    <el-input placeholder="密码" type="password" v-model="user.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="bottom-btn">
                    <el-button style="width: 100%" type="primary" @click.native="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { add, format } from '~/utils/date';
    import _ from 'lodash';
    export default {
    	created() {},
    	data() {
    		return {
    			user: {}
    		};
    	},
    	methods: {
    		login() {
    			this.$store
    				.dispatch('POST_LOGIN')
    				.then(() => this.$store.dispatch('GET_ENVIRONMENTS'))
    				.then(() => this.$router.push('/'));
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

    	h4 {
    		padding: 10px 0 0;
    		color: @dark;
    		text-align: center;

    		span {
    			display: inline-block;
    			letter-spacing: 20px;
    			text-indent: 20px;
    			border-bottom: 3px solid @primary;
    			padding-bottom: 10px;
    			margin-bottom: 20px;
    		}
    	}

    	.container {
    		width: 300px;
    		padding: 40px 60px;
    		background: #fff;
    		box-shadow: 0 0 15px #eee;
    		border-radius: 4px;
    	}

    	.bottom-btn {
    		margin-bottom: 0px;

    		button {
    			box-shadow: 0 0 10px @primary;
    		}
    	}
    }
</style>

