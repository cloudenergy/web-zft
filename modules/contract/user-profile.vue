<template>
	<div class="profile"><el-row>
		<el-col :span="8">
			<el-input placeholder="必填" v-model="profile.name">
				<template slot="prepend">姓名</template>
			</el-input>
		</el-col>
		<el-col :span="8">
			<el-input placeholder="必填(建议手机号)" v-model="profile.account">
				<template slot="prepend">账号</template>
			</el-input>
		</el-col>
		<el-col :span="8">
			<el-input placeholder="选填" v-model="profile.phone">
				<template slot="prepend">电话</template>
			</el-input>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="8">
			<el-input placeholder="男" v-model="profile.gender">
				<template slot="prepend">性别</template>
			</el-input>
		</el-col>
		<el-col :span="5">
			<el-select v-model="profile.idType" class="id-type">
				<el-option label="身份证" value="1"></el-option>
				<el-option label="护照" value="2"></el-option>
				<el-option label="港澳通行证" value="3"></el-option>
				<el-option label="台胞证" value="4"></el-option>
				<el-option label="居住证" value="5"></el-option>
				<el-option label="临时居住证" value="6"></el-option>
				<el-option label="营业执照" value="7"></el-option>
				<el-option label="其他证件" value="8"></el-option>
			</el-select>
		</el-col>
		<el-col :span="11">
			<el-input placeholder="证件号(选填)" v-model="profile.idNumber">
			</el-input>
		</el-col>
	</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			profile: {
				required: true
			}
		}
	}
</script>