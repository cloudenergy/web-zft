<template>
 
<div class="housing">
  <el-tabs v-model="activeName">
    <el-tab-pane label="整租" name="wholeRent">
      <el-form ref="wholeRent">
         <p class="formTit">基本信息
                <span>
                    <el-button @click="dialogVisible=true">新增</el-button>
                    <el-button type="danger" @click="save">保存</el-button>
                </span>
            </p>

            <el-form-item v-for="(value,key,index) in wholeRent" :label="transition(key)" :key="value.id">
                <ul class="formUl">
                    <li v-for="(v,i,k) in value" :key="v.id">
                        <el-checkbox :label="v"></el-checkbox>
                        <i class="el-icon-delete" @click="alertMsg(value,i)"></i>
                    </li>
                </ul>
            </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="合租" name="jointRent">
		<el-form ref="jointRent">
         <p class="formTit">基本信息
                <span>
                    <el-button @click="hzdialogVisible=true">新增</el-button>
                    <el-button type="danger" @click="save">保存</el-button>
                </span>
            </p>

            <el-form-item v-for="(value,key,index) in jointRent" :label="transition(key)" :key="value.id">
                <ul class="formUl">
                    <li v-for="(v,i,k) in value" :key="v.id">
                        <el-checkbox :label="v"></el-checkbox>
                        <i class="el-icon-delete" @click="alertMsg(value,i)"></i>
                    </li>
                </ul>
            </el-form-item>
      </el-form>
    </el-tab-pane>
	</el-tab-pane>
    <el-tab-pane label="独栋" name="third">
		<el-form ref="detached">
         <p class="formTit">基本信息
                <span>
                    <el-button @click="dddialogVisible=true">新增</el-button>
                    <el-button type="danger" @click="save">保存</el-button>
                </span>
            </p>

            <el-form-item v-for="(value,key,index) in detached" :label="transition(key)" :key="value.id">
                <ul class="formUl">
                    <li v-for="(v,i,k) in value" :key="v.id">
                        <el-checkbox :label="v"></el-checkbox>
                        <i class="el-icon-delete" @click="alertMsg(value,i)"></i>
                    </li>
                </ul>
            </el-form-item>
      </el-form>
    </el-tab-pane>
	</el-tab-pane>
  </el-tabs>

<!-- zhengzu -->
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">

            <div class="addDiv">
                <el-col :span="6">
                    <label>名称</label>
                </el-col>

                <el-col :span="16">
                    <el-input v-model="addInput" placeholder="名称"></el-input>
                </el-col>
            </div>


            <div class="addDiv">
                <el-col :span="6">
                    <label>所属项目</label>
                </el-col>

                <el-col :span="16">
                    <el-select v-model="addSelect" placeholder="请选择" class="addSelect">
                        <el-option v-for="(val,key,index) in wholeRent" 
                        :key="val.id" 
                        :label="transition(key)" 
                        :value='key'></el-option>
                    </el-select>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>

		<!-- hezu -->
		<el-dialog title="提示" :visible.sync="hzdialogVisible" width="30%">

            <div class="addDiv">
                <el-col :span="6">
                    <label>名称</label>
                </el-col>

                <el-col :span="16">
                    <el-input v-model="addInput" placeholder="名称"></el-input>
                </el-col>
            </div>


            <div class="addDiv">
                <el-col :span="6">
                    <label>所属项目</label>
                </el-col>

                <el-col :span="16">
                    <el-select v-model="addSelect" placeholder="请选择" class="addSelect">
                        <el-option v-for="(val,key,index) in jointRent" 
                        :key="val.id" 
                        :label="transition(key)" 
                        :value='key'></el-option>
                    </el-select>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="hzdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>


		<!-- dd -->
		<el-dialog title="提示" :visible.sync="dddialogVisible" width="30%">

            <div class="addDiv">
                <el-col :span="6">
                    <label>名称</label>
                </el-col>

                <el-col :span="16">
                    <el-input v-model="addInput" placeholder="名称"></el-input>
                </el-col>
            </div>


            <div class="addDiv">
                <el-col :span="6">
                    <label>所属项目</label>
                </el-col>

                <el-col :span="16">
                    <el-select v-model="addSelect" placeholder="请选择" class="addSelect">
                        <el-option v-for="(val,key,index) in detached" 
                        :key="val.id" 
                        :label="transition(key)" 
                        :value='key'></el-option>
                    </el-select>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dddialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
</div>

</template>

<script>
export default {
	data() {
		return {
			dddialogVisible: false,
			hzdialogVisible: false,
			dialogVisible: false,
			addSelect: '',
			addInput: '',
			activeName: 'wholeRent',
			wholeRent: {
				equip: [
					'Wifi',
					'电梯',
					'健身房',
					'游泳池',
					'停车位',
					'超市',
					'厨房',
					'电磁炉',
					'橱柜',
					'油烟机',
					'洗衣机',
					'烘干机',
					'空调',
					'冰箱',
					'热水器',
					'电视',
					'微波炉',
					'烤箱'
				],
				feature: ['品牌家电', '精装修', '地铁沿线', '代收快递', '专属客服', '房间清洁', '智能门锁']
			},
			detached: {
				detachedCommon: [
					'健身房',
					'游泳池',
					'停车位',
					'洗衣房',
					'电梯',
					'咖啡厅',
					'Wifi',
					'前台',
					'厨房',
					'ATM机',
					'公寓超市',
					'智能门锁',
					'代收快递'
				],

				detachedRoom: [
					'Wifi',
					'书桌',
					'椅子',
					'大床',
					'厨房',
					'电磁炉',
					'橱柜',
					'油烟机',
					'卫生间',
					'洗衣机',
					'电视',
					'微波炉',
					'空调',
					'冰箱',
					'热水器',
					'烘干机',
					'衣柜'
				],
				detachedRoomFeatures: [
					'品牌家电',
					'精装修',
					'地铁沿线',
					'朝南户型',
					'景观好',
					'代收快递',
					'专属客服',
					'房间清洁',
					'智能门锁'
				]
			},

			jointRent: {
				common: [
					'Wifi',
					'电梯',
					'健身房',
					'游泳池',
					'停车位',
					'超市',
					'厨房',
					'电磁炉',
					'橱柜',
					'油烟机',
					'洗衣机',
					'烘干机',
					'空调',
					'冰箱',
					'热水器',
					'电视',
					'微波炉',
					'烤箱'
				],

				room: ['衣柜', '书桌', '椅子', '大床', '空调', '电视'],
				roomFeatures: [
					'朝南',
					'独卫',
					'飘窗',
					'阳台',
					'地铁沿线',
					'代收快递',
					'专属客服',
					'房间清洁',
					'智能门锁'
				]
			}
		};
	},
	methods: {
		transition(name) {
			switch (name) {
				case 'equip':
					return '配备';
					break;
				case 'feature':
					return '特色';
					break;

				case 'common':
					return '公区配备';
					break;
				case 'room':
					return '房间配备';
					break;
				case 'roomFeatures':
					return '房间特色';
					break;

				case 'detachedCommon':
					return '公区配备';
					break;
				case 'detachedRoom':
					return '房间配备';
					break;
				case 'detachedRoomFeatures':
					return '房间特色';
					break;
			}
		},
		tra(name) {
			let _obj;
			switch (name) {
				case 'equip':
					_obj = this.wholeRent.equip;
					break;
				case 'feature':
					_obj = this.wholeRent.feature;
					break;

				case 'common':
					_obj = this.jointRent.common;
					break;
				case 'room':
					_obj = this.jointRent.room;
					break;
				case 'roomFeatures':
					_obj = this.jointRent.roomFeatures;
					break;

				case 'detachedCommon':
					_obj = this.detached.detachedCommon;
					break;
				case 'detachedRoom':
					_obj = this.detached.detachedRoom;
					break;
				case 'detachedRoomFeatures':
					_obj = this.detached.detachedRoomFeatures;
					break;
			}
			return _obj;
		},
		add() {
			this.dialogVisible = false;
			this.hzdialogVisible = false;
			this.dddialogVisible = false;
			let _select = this.tra(this.addSelect);
			let _input = this.addInput;
			_select.push(_input);
			this.addSelect='';
			this.addInput='';
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
					// console.log(name)
					// console.log(index)
					// console.log(name[index])
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
		save() {
			console.log('save');
		}
	}
};
</script>

<style lang='less' scoped>
.housing {
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
