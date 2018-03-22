<template>
	<div class="profile profile-form">
		<el-row>
			<el-col :span="8">
				<el-form-item>
					<el-input class="form-input" placeholder="必填" v-model="user.name" disabled>
						<template slot="prepend">姓名</template>
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item>
					<el-input class="form-input" placeholder="必填(建议手机号)" v-model="user.accountName" disabled>
						<template slot="prepend">账号</template>
					</el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form :rules="rules">
				<el-form-item prop="mobile">
					<el-input class="form-input" placeholder="必填" v-model="user.mobile" disabled>
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
					<el-select v-model="user.gender" class="gender prepend-label" disabled>
						<el-option label="男" value="M"></el-option>
						<el-option label="女" value="F"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="5">
				<el-select v-model="user.documentType" class="id-type" disabled>
					<el-option v-for="t in idTypes" :label="t.name" :value="t.id" :key="t.id" disabled></el-option>
				</el-select>
			</el-col>
			<el-col :span="11">
				<el-input placeholder="证件号(选填)" v-model="user.documentId" disabled>
				</el-input>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import _ from 'lodash'

	export default {
		props: {
			user: {
				type: Object,
				required: true,
				validator: value => _.includes(_.range(1, 9), value.documentType) && _.includes(['M', 'F'], value.gender)
			}
		},
		data() {
			var validateMobile = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号'));
				} else {
					if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.user.mobile))) {
						callback(new Error('手机号输入错误'));
					}
					callback();
				}
			};
			return {
				idTypes: [{
					id: 1,
					name: '身份证',
				}, {
					id: 2,
					name: '护照',
				}, {
					id: 3,
					name: '港澳通行证',
				}, {
					id: 4,
					name: '台胞证',
				}, {
					id: 5,
					name: '居住证',
				}, {
					id: 6,
					name: '临时居住证',
				}, {
					id: 7,
					name: '营业执照',
				}, {
					id: 8,
					name: '其他证件',
				}],
				rules: {
					mobile: [{
						validator: validateMobile,
						trigger: 'blur'
					}]
				}
			}
		}

	}
</script>