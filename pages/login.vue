<template>
    <div class="login">
        <div class="container">
            <el-form status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户" prop="user.mobile">
                    <el-input type="text" v-model="user.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="user.pass">
                    <el-input type="password" v-model="user.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="login()">登录</el-button>
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

    	.container {
    		width: 300px;
    	}
    }
</style>

