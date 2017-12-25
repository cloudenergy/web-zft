<template>

    <div class="contract">
        <el-tabs v-model="activeName">
            <el-tab-pane label="租客合同" name="tenantContract">
                <el-form ref="tenantContract">
                    <p class="formTit">合同设定
                        <span>
                            <el-button type="danger" @click="save">保存</el-button>
                        </span>
                    </p>

                    <el-form-item label="零散租期非整月">
                        <el-checkbox-group v-model="tenantContractNonMonth">
                            <div v-for="(nonMonth,index) in tenantContract.nonMonth" :key="nonMonth.id">
                            <el-checkbox :label="nonMonth.name" >{{nonMonth.name}}</el-checkbox>
                            <i @click="clickDefault(tenantContract.nonMonth,index)" :class='nonMonth.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="零散租期整月">
                        <el-checkbox-group v-model="tenantContractWholeMonth">
                            <div v-for="wholeMonth in tenantContract.wholeMonth" :key="wholeMonth.id">
                            <el-checkbox :label="wholeMonth.name">{{wholeMonth.name}} </el-checkbox>
                             <i :class='wholeMonth.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                 
                    <el-form-item label="付款方式">
                        <el-checkbox-group v-model="tenantContractPayment">
                            <div v-for="payment in tenantContract.payment" :key="payment.id">
                            <el-checkbox :label="payment.name" >{{payment.name}} </el-checkbox>            
                             <i :class='payment.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>                 
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                       <el-form-item label="加收费用+增加">
                        <el-checkbox-group v-model="tenantContractExtraCharges">
                            <div v-for="extraCharges in tenantContract.extraCharges" :key="extraCharges.id">
                            <el-checkbox :label="extraCharges.name" >{{extraCharges.name}} </el-checkbox>
                             <i :class='extraCharges.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="默认显示费用">
                        <el-checkbox-group v-model="tenantContractDefaultDisplayFee">
                            <div v-for="defaultDisplayFee in tenantContract.defaultDisplayFee" :key="defaultDisplayFee.id">
                            <el-checkbox :label="defaultDisplayFee.name">{{defaultDisplayFee.name}} </el-checkbox>
                             <i :class='defaultDisplayFee.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="押金 +增加">
                        <el-checkbox-group v-model="tenantContractDeposit">
                            <div v-for="deposit in tenantContract.deposit" :key="deposit.id">
                            <el-checkbox :label="deposit.name">{{deposit.name}} </el-checkbox>
                             <i :class='deposit.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="默认显示押金">
                        <el-checkbox-group v-model="tenantContractDefaultDisplayDeposit">
                            <div v-for="defaultDisplayDeposit in tenantContract.defaultDisplayDeposit" :key="defaultDisplayDeposit.id">
                            <el-checkbox :label="defaultDisplayDeposit.name">{{defaultDisplayDeposit.name}}</el-checkbox>
                              <i :class='defaultDisplayDeposit.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="支付时间">
                        <el-checkbox-group v-model="tenantContractPayTime">
                            <div v-for="payTime in tenantContract.payTime" :key="payTime.id">
                            <el-checkbox :label="payTime.name" >{{payTime.name}}</el-checkbox>
                             <i :class='payTime.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
            </el-tab-pane>
            <el-tab-pane label="业主合同" name="jointRent">
                <el-form ref="jointRent">
                    <p class="formTit">合同设定
                        <span>
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
        </el-tabs>

        <!-- zhengzu -->
        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">

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
                        <el-option v-for="(val,key,index) in wholeRent" :key="val.id" :label="transition(key)" :value='key'></el-option>
                    </el-select>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- hezu -->
        <!-- <el-dialog title="提示" :visible.sync="hzdialogVisible" width="30%">

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
                        <el-option v-for="(val,key,index) in jointRent" :key="val.id" :label="transition(key)" :value='key'></el-option>
                    </el-select>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="hzdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog> -->


        <!-- dd -->
        <!-- <el-dialog title="提示" :visible.sync="dddialogVisible" width="30%">

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
                        <el-option v-for="(val,key,index) in detached" :key="val.id" :label="transition(key)" :value='key'></el-option>
                    </el-select>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dddialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>

</template>

<script>
export default {
	data() {
		return {
			tenantContractNonMonth: [],
			tenantContractWholeMonth: [],
			tenantContractPayment: [],
			tenantContractExtraCharges: [],
			tenantContractDefaultDisplayFee: [],
			tenantContractDeposit: [],
			tenantContractDefaultDisplayDeposit: [],
			tenantContractPayTime: [],

			dddialogVisible: false,
			hzdialogVisible: false,
			dialogVisible: false,
			addSelect: '',
			addInput: '',
			activeName: 'tenantContract',
			tenantContract: {
				nonMonth: [
					{ name: '不设置零散租金', isDefault: true },
					{ name: '零散期前置', isDefault: false },
					{ name: '零散期后置', isDefault: true },
					{ name: '零散期前后置(灵活)', isDefault: true }
				],
				wholeMonth: [
					{ name: '不设置零散租金', isDefault: true },
					{ name: '零散期前后置(月末)', isDefault: true },
					{ name: '零散期前后置(灵活)', isDefault: true }
				],
				deposit: [
					{ name: '常规押金', isDefault: true },
					{ name: '门卡押金', isDefault: true },
					{ name: '钥匙押金', isDefault: true },
					{ name: '家具押金', isDefault: true },
					{ name: '家电押金', isDefault: true },
					{ name: '外门卡押金', isDefault: true }
				],
				payment: [
					{ name: '1月一付', isDefault: true },
					{ name: '2月一付', isDefault: true },
					{ name: '3月一付', isDefault: false },
					{ name: '4月一付', isDefault: true },
					{ name: '半年一付', isDefault: true },
					{ name: '一年一付', isDefault: true },
					{ name: '一次付清', isDefault: true }
				],
				extraCharges: [
					{ name: '电费', isDefault: true },
					{ name: '煤气费', isDefault: true },
					{ name: '冷水费', isDefault: true },
					{ name: '热水费', isDefault: true },
					{ name: '网费', isDefault: true },
					{ name: '电视费', isDefault: false },
					{ name: '物业费', isDefault: true },
					{ name: '维修费', isDefault: true },
					{ name: '保洁费', isDefault: true },
					{ name: '保险费', isDefault: true },
					{ name: '服务费', isDefault: true },
					{ name: '委管费', isDefault: true }
				],
				defaultDisplayFee: [],
				defaultDisplayDeposit: [],
				payTime: [
					{ name: '账单开始前提前', isDefault: true },
					{ name: '账单开始后固定', isDefault: true },
					{ name: '账单开始前固定', isDefault: true },
					{ name: '账单开始前1个月固定', isDefault: true }
				]
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
				case 'nonMonth':
					return '零散租期非整月';
					break;
				case 'wholeMonth':
					return '零散租期整月';
					break;
				case 'payment':
					return '付款方式';
					break;
				case 'extraCharges':
					return '加收费用';
					break;

				case 'defaultDisplayFee':
					return '默认显示费用';
					break;

				case 'defaultDisplayDeposit':
					return '默认显示押金';
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
			let _obj = name;
			// switch (name) {
			//     case 'nonMonth':
			//         _obj = this.wholeRent.nonMonth;
			//         break;
			//     case 'feature':
			//         _obj = this.wholeRent.wholeMonth;
			//         break;

			//     case 'common':
			//         _obj = this.jointRent.payment;
			//         break;
			//     case 'room':
			//         _obj = this.jointRent.room;
			//         break;
			//     case 'roomFeatures':
			//         _obj = this.jointRent.roomFeatures;
			//         break;

			//     case 'detachedCommon':
			//         _obj = this.detached.detachedCommon;
			//         break;
			//     case 'detachedRoom':
			//         _obj = this.detached.detachedRoom;
			//         break;
			//     case 'detachedRoomFeatures':
			//         _obj = this.detached.detachedRoomFeatures;
			//         break;
			// }
			return _obj;
		},
		add() {
			this.dialogVisible = false;
			this.hzdialogVisible = false;
			this.dddialogVisible = false;
			let _select = this.tra(this.addSelect);
			let _input = this.addInput;
			_select.push(_input);
			this.addSelect = '';
			this.addInput = '';
		},
        clickDefault(key,index){
            // this.
            key[index].isDefault=!key[index].isDefault
                console.log(key[index])
                console.log(index)
        },
		
		save() {
			console.log('save');
		}
	}
};
</script>

<style lang='less' scoped>
.contract {
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
		width: 110px;

		margin-left: 20px;
		text-align: left;
	}

	.el-checkbox-group {
		width: 80%;
		float: left;
		div {
			float: left;
			width: 180px;
			margin-left: 15px;
			i {
				font-size: 14px;
				line-height: 28px;
				display: none;
				margin-left: 5px;
			}
			.el-icon-star-off {
				color: #bbbbbb;
			}
			.el-icon-star-on {
				color: #5bcecc;
				display: inline-block;
			}
		}

		div:hover i {
			display: inline-block;
		}
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