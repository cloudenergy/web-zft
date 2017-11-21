<template>
	<div class="profile">
		<el-row>
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
					<el-option
							v-for="t in idTypes"
							:label="t.name"
							:value="t.id"
							:key="t.id"></el-option>
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
	import _ from 'lodash'

	export default {
		props: {
			profile: {
				type: Object,
				required: true,
				validator: value => _.includes(_.range(1, 9), value.idType)
			}
		},
		data() {
			return {
				idTypes: [
					{
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
					}
				]
			}
		}

	}
</script>