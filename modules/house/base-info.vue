<template>
	<div class="wrapper">
		<div class="group">
			<rent-type-select v-model="model.houseFormat"></rent-type-select>
			<el-form-item label="编号">
				<el-input v-model="model.code" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="model.houseKeeper" placeholder="管理员">
					<el-option label="root" value="212231"></el-option>
					<el-option label="admin" value="858494"></el-option>
				</el-select>
			</el-form-item>
		</div>
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