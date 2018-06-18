<template>
	<div class="profile profile-form">
		<el-row>
			<el-col :span="8">
				<el-form-item prop="user.name" :rules="[
      						{ required: true, message: '请输入姓名', trigger: 'blur' }
    					]">
					<el-input class="form-input" placeholder="必填" v-model="user.name">
						<template slot="prepend">姓名</template>
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item prop="user.accountName" :rules="[
      						{ required: true, message: '请输入账号', trigger: 'blur' }
    					]">
					<el-input class="form-input" placeholder="必填(建议手机号)" v-model="user.accountName">
						<template slot="prepend">账号</template>
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form :rules="rules">
					<el-form-item prop="mobile">
						<el-input class="form-input" placeholder="必填" v-model="user.mobile" maxlength="11">
							<template slot="prepend">电话</template>
						</el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<div class="select-with-label el-input-group">
					<span class="el-input-group__prepend">性别</span>
					<el-select v-model="user.gender" class="gender prepend-label">
						<el-option label="男" value="M"></el-option>
						<el-option label="女" value="F"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="5">
				<el-select v-model="user.documentType" class="id-type">
					<el-option v-for="t in idTypes" :label="t.name" :value="t.id" :key="t.id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="11">
				<el-input placeholder="证件号(选填)" v-model="user.documentId" :maxlength="fieldLengthOf(user.documentType)">
				</el-input>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import fp from 'lodash/fp'

	export default {
		props: {
			user: {
				type: Object,
				required: true,
				validator: value => fp.includes(value.gender)(['M', 'F'])
			}
		},
		data() {
			return {
				idTypes: [{
					id: 1,
					name: '身份证',
					length: 18
				}],
				rules: {
					mobile: [{
						validator: this.validateMobile,
						trigger: 'blur'
					}]
				}
			}
		},
		methods:{
			fieldLengthOf() {
				return 18;
			},
      validateMobile(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.user.mobile))) {
            callback(new Error('手机号输入错误'));
          }
          callback();
        }
      }
		}

	}
</script>
