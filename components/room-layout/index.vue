<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-input v-model="form.bedRoom">
					<template slot="prepend">户型</template>
					<template slot="append">室</template>
				</el-input>
			</el-col>
			<el-col :span="6">
				<el-input v-model="form.livingRoom">
					<template slot="append">&nbsp;&nbsp;厅&nbsp;</template>
				</el-input>
			</el-col>
			<el-col :span="6">
				<el-input v-model="form.bathRoom">
					<template slot="append">卫</template>
				</el-input>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			rentType: {
				type: null
			},
			value: {
				type: Object,
				default () {
					return {
						bedRoom: 1,
						livingRoom: 1,
						bathRoom: 1,
						orientation: 'N'
					};
				}
			}
		},
		created() {
			this.form = this.value;
		},
		data() {
			return {
				form: {}
			};
		},
		watch: {
			form(val) {
				this.$emit('input', val);
			},
			rentType(val) {
				if (val == 'SHARE') {
					this.form.bedRoom = 2;
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.inputs {
		display: flex;

		.el-input {
			width: 24%;
			margin: 2px 10px 2px 0px;
		}
	}
</style>