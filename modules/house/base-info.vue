<template>
	<div class="wrapper">
			<el-row :gutter="20">
				<el-col :span="6">
				<div tabindex="0" class="el-input-group__prepend addwidth" style="font-size:14px;display:inline-block">方式</div>
				<rent-type-select v-model="model.houseFormat"></rent-type-select>
				</el-col>
				<el-col :span="6">
				<el-input v-model="model.code" auto-complete="off" style="width:210px">
					<template slot="prepend">编号</template>
				</el-input>
				</el-col>
				<el-col :span="6">
				<el-select v-model="model.houseKeeper" placeholder="管理员" style="width:210px">
					<el-option label="root" value="212231"></el-option>
					<el-option label="admin" value="858494"></el-option>
				</el-select>
				</el-col>
			</el-row>
		<city-area :isForm="true" @change="cityAreaChange" class="group" />
	</div>
</template>

<script>
	export default {
		props: {
			form: {
				type: Object,
				default () {
					return {
						houseFormat: 'SOLE',
						code: ''
					};
				}
			}
		},
		watch: {
			model: {
				handler(val) {
					this.$emit('change', val);
				},
				deep: true
			}
		},
		created() {
			this.$set(this, 'model', this.form);
		},
		methods: {
			cityAreaChange({
				city,
				area
			}) {
				this.model.city = city;
				this.model.area = area;
			}
		},
		data() {
			return {
				model: {},
				options: {
					city: [],
					area: []
				}
			};
		}
	};
</script>

<style>
	.mini-form .el-form-item__label {
		margin-top: 1.5px;
	}
</style>
<style scoped>
	.addwidth{
		width: 65px;
		height: 28px;
		line-height:28px
	}
</style>
