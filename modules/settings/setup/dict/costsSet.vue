<template>
	<div class="setup_costsSet">
		<el-form ref="form">
			<p class="formTit">基本信息
				<span>
					<el-button @click="dialogVisible=true">新增</el-button>
					<el-button type="danger" @click="save">保存</el-button>
				</span>
			</p>


			<el-form-item v-for="(value,key,index) in form" :label="transition(key)" :key="value.id">
				<ul class="formUl">
					<li v-for="(v,i,k) in value" :key="v.id">
						{{v}}
						<i class="el-icon-delete" @click="alertMsg(value,i)"></i>
					</li>
				</ul>
			</el-form-item>
		</el-form>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">

			<div class="addDiv">
				<el-col :span="6">
					<label>名称</label>
				</el-col>

				<el-col :span="16">
					<el-input v-model="addInput"></el-input>
				</el-col>
			</div>


			<div class="addDiv">
				<el-col :span="6">
					<label>所属项目</label>
				</el-col>

				<el-col :span="16">
					<el-select v-model="addSelect" placeholder="请选择" class="addSelect">
						<el-option v-for="(val,key,index) in form" :key="val.id" :label="transition(key)" :value='key'></el-option>
					</el-select>
				</el-col>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addInput: '',
				addSelect: [],
				arr: {
					name: []
				},
				dialogVisible: false,
				form: {
					cashPledge: [
						'常规押金',
						'门卡押金',
						'内门卡押金',
						'外门卡押金',
						'门禁押金',
						'钥匙押金',
						'家具押金',
						'家电押金',
						'电卡押金',
						'水卡押金',
						'电费押金',
						'水费押金',
						'水电押金',
						'装修押金',
						'其他押金'
					],
					energy: [
						'水费',
						'电费',
						'煤气费',
						'供暖费',
						'燃气费',
						'冷水费',
						'热水费',
						'网费',
						'宽带费',
						'电视费',
						'天然气费',
						'暖气费'
					],
					service: [
						'物业费',
						'维修费',
						'委管费',
						'保洁费',
						'保险费',
						'运输费',
						'装修费',
						'服务费',

						'管理费',
						'生活费',
						'卫生费',
						'换房费'
					],
					rent: [
						'租金',
						'家具租赁费',
						'家电租赁费',
						'电视租赁费',
						'冰箱租赁费',
						'洗衣机租赁费',
						'空调租赁费',
						'空气净化器租赁费'
					],

					handling: [
						'手续费',
						'刷卡手续费',
						'月付手续费',
						'分期手续费',
						'转账手续费',
						'中介费',
						'滞纳金',
						'利息',
						'税费',
						'开票税金',
						'支付手续费',
						'提现手续费'
					],

					miscellaneous: [
						'材料费',
						'工本费',
						'门卡工本费',
						'电卡工本费',
						'水卡工本费',
						'车位费',
						'电梯费',
						'垃圾费',
						'垃圾处理费',
						'电动车充电费',
						'开荒保洁费',
						'床上用品费',
						'维修基金',
						'安装费',
						'维修物料费',
						'维修人工费'
					],
					other: [
						'其他费用',
						'违约金',
						'赔偿金',
						'家电费',
						'家具费',
						'优惠',
						'折扣',
						'满减',
						'定金',
						'退定',
						'退款',
						'尾款',
						'其他费用'
					]
				}
			};
		},
		methods: {
			transition(name) {
				switch (name) {
					case 'cashPledge':
						return '押金';
						break;
					case 'energy':
						return '能源费';
						break;
					case 'service':
						return '服务费';
						break;
					case 'rent':
						return '租赁费';
						break;
					case 'handling':
						return '手续费';
						break;
					case 'miscellaneous':
						return '杂费';
						break;
					case 'other':
						return '其他费用';
						break;
				}
			},
			tra(name) {
				let _obj;
				switch (name) {
					case 'cashPledge':
						_obj = this.form.cashPledge;
						break;
					case 'energy':
						_obj = this.form.energy;
						break;
					case 'service':
						_obj = this.form.service;
						break;
					case 'rent':
						_obj = this.form.rent;
						break;
					case 'handling':
						_obj = this.form.handling;
						break;
					case 'miscellaneous':
						_obj = this.form.miscellaneous;
						break;
					case 'other':
						_obj = this.form.other;
						break;
				}
				return _obj
			},
			add() {
				this.dialogVisible = false
				// this.form.
				let _select = this.tra(this.addSelect);
				let _input = this.addInput;
				_select.push(_input)
			},

			del(name, index) {
				name.splice(index, 1);
			},

			alertMsg(name, index) {
				this.$confirm('您确定要删除这条信息吗?', '', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						this.del(name, index);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					.catch(err => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			},
			save() {}
		}
	};
</script>

<style lang='less' scoped>
	.setup_costsSet {
		.formTit {
			background-color: #e0e7ec;
			line-height: 52px;
			padding-left: 20px;
			font-size: 14px;
			color: #000;
			border-top: none;
			margin-bottom: 10px;
			span {
				float: right;
				margin-right: 20px;
			}
		}

		form {
			background: #fff;
			padding-bottom: 10px;
			margin-bottom: 10px;
		}

		/deep/ label.el-form-item__label {
			width: 70px;

			margin-left: 20px;
			text-align: left;
		}

		.formUl {
			float: left;
			width: 80%;
		}

		.formUl li {
			float: left;
			list-style: none;
			margin-left: 5%;
			width: 20%;
		}

		.formUl li i {
			float: right;
			line-height: 28px;
			margin-right: 20p;
			display: none;
			color: #5bcecc;
		}

		.formUl li:hover i {
			display: block;
		}

		.formUl li i:hover {
			cursor: pointer;
		}
		.addDiv {
			margin-bottom: 15px;
			float: left;
			width: 100%;
			.addSelect {
				width: 100%;
			}
		}
	}
</style>