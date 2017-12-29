<template>

    <div class="contract">
        <el-tabs v-model="activeName">
            <el-tab-pane label="租客合同" name="tenantContract">
                <el-form ref="tenantContract">
                    <p class="formTit">租客合同
                        <span>
                            <el-button type="danger" @click="save">保存</el-button>
                        </span>
                    </p>

                    <el-form-item label="零散租期非整月">
                        <el-checkbox-group v-model="tenantContractNonMonth">
                            <div v-for="(nonMonth,index) in tenantContract.nonMonth" :key="nonMonth.id">
                                <el-checkbox :label="nonMonth.name" :checked="nonMonth.isChecked">{{nonMonth.name}}</el-checkbox>
                                <i @click="radioDefault(tenantContract.nonMonth,index,tenantContractNonMonth)" :class='nonMonth.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="零散租期整月">
                        <el-checkbox-group v-model="tenantContractWholeMonth">
                            <div v-for="(wholeMonth,index) in tenantContract.wholeMonth" :key="wholeMonth.id">
                                <el-checkbox :label="wholeMonth.name" :checked="wholeMonth.isChecked">{{wholeMonth.name}} </el-checkbox>
                                <i @click="radioDefault(tenantContract.wholeMonth,index,tenantContractWholeMonth)" :class='wholeMonth.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>


                    <el-form-item label="付款方式">
                        <el-checkbox-group v-model="tenantContractPayment">
                            <div v-for="(payment,index) in tenantContract.payment" :key="payment.id">
                                <el-checkbox :label="payment.name" :checked="payment.isChecked">{{payment.name}} </el-checkbox>
                                <i @click="radioDefault(tenantContract.payment,index,tenantContractPayment)" :class='payment.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">加收费用
                            <a @click="extraChargesDialog=true"> +增加</a>
                        </span>
                        <el-checkbox-group v-model="tenantContractExtraCharges">
                            <div v-for="(extraCharges,index) in tenantContract.extraCharges" :key="extraCharges.id">
                                <el-checkbox :label="extraCharges.name" :checked="extraCharges.isChecked">{{extraCharges.name}} </el-checkbox>
                                <i @click="checkDefault(tenantContract.extraCharges,index,tenantContractExtraCharges,'tenantContractDefaultDisplayFee')"
                                    :class='extraCharges.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="默认显示费用">
                        <ul v-if="tenantContract.defaultDisplayFee.length !=0">
                            <li v-for="val in tenantContract.defaultDisplayFee" :key="val.id">
                                <el-col :span="2">
                                    <label>{{val.name}}</label>
                                </el-col>
                                <el-col :span="5">
                                    <el-select v-model="tenantContractDefaultDisplayFeeTimeVal" placeholder="请选择">
                                        <el-option v-for="item in tenantContractDefaultDisplayFeeTime" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <el-input v-model="tenantContractDefaultDisplayFeeInput" placeholder="请输入内容">
                                        <span slot="suffix">元/月</span>
                                    </el-input>
                                </el-col>
                            </li>
                        </ul>
                        <p v-else>无</p>

                    </el-form-item>

                    <el-form-item>
                        <span slot="label">押金
                            <a @click="depositDialog=true"> +增加</a>
                        </span>
                        <el-checkbox-group v-model="tenantContractDeposit">
                            <div v-for="(deposit,index) in tenantContract.deposit" :key="deposit.id">
                                <el-checkbox :label="deposit.name" :checked="deposit.isChecked">{{deposit.name}} </el-checkbox>
                                <i @click="checkDefault(tenantContract.deposit,index,tenantContractExtraCharges,'tenantContractDefaultDisplayDeposit')" :class='deposit.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="默认显示押金">
                        <ul v-if="tenantContract.defaultDisplayDeposit.length !=0">
                            <li v-for="val in tenantContract.defaultDisplayDeposit" :key="val.id">
                                <el-col :span="3">
                                    <label>{{val.name}}</label>
                                </el-col>

                                <el-col :span="5">
                                    <el-input v-model="tenantContractDefaultDisplayFeeInput" placeholder="请输入内容">
                                        <span slot="prefix">共</span>
                                    </el-input>
                                </el-col>
                            </li>
                        </ul>
                        <p v-else>无</p>
                    </el-form-item>

                    <el-form-item label="支付时间">
                        <el-checkbox-group v-model="tenantContractPayTime">
                            <div v-for="(payTime,index) in tenantContract.payTime" :key="payTime.id">
                                <el-checkbox :label="payTime.name" :checked="payTime.isChecked">{{payTime.name}}</el-checkbox>
                                <i @click="radioDefault(tenantContract.payTime,index,tenantContractPayTime)" :class='payTime.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
            </el-tab-pane>
            <el-tab-pane label="业主合同" name="jointRent">
                <el-form ref="tenantContract">
                    <p class="formTit">业主合同
                        <span>
                            <el-button type="danger" @click="save">保存</el-button>
                        </span>
                    </p>

                    <el-form-item label="零散租期非整月">
                        <el-checkbox-group v-model="tenantContractNonMonth">
                            <div v-for="(nonMonth,index) in tenantContract.nonMonth" :key="nonMonth.id">
                                <el-checkbox :label="nonMonth.name" :checked="nonMonth.isChecked">{{nonMonth.name}}</el-checkbox>
                                <i @click="radioDefault(tenantContract.nonMonth,index,tenantContractNonMonth)" :class='nonMonth.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="零散租期整月">
                        <el-checkbox-group v-model="tenantContractWholeMonth">
                            <div v-for="(wholeMonth,index) in tenantContract.wholeMonth" :key="wholeMonth.id">
                                <el-checkbox :label="wholeMonth.name" :checked="wholeMonth.isChecked">{{wholeMonth.name}} </el-checkbox>
                                <i @click="radioDefault(tenantContract.wholeMonth,index,tenantContractWholeMonth)" :class='wholeMonth.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>


                    <el-form-item label="付款方式">
                        <el-checkbox-group v-model="tenantContractPayment">
                            <div v-for="(payment,index) in tenantContract.payment" :key="payment.id">
                                <el-checkbox :label="payment.name" :checked="payment.isChecked">{{payment.name}} </el-checkbox>
                                <i @click="radioDefault(tenantContract.payment,index,tenantContractPayment)" :class='payment.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">加收费用
                            <a @click="extraChargesDialog=true"> +增加</a>
                        </span>
                        <el-checkbox-group v-model="tenantContractExtraCharges">
                            <div v-for="(extraCharges,index) in tenantContract.extraCharges" :key="extraCharges.id">
                                <el-checkbox :label="extraCharges.name" :checked="extraCharges.isChecked">{{extraCharges.name}} </el-checkbox>
                                <i @click="checkDefault(tenantContract.extraCharges,index,tenantContractExtraCharges,'tenantContractDefaultDisplayFee')"
                                    :class='extraCharges.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="默认显示费用">
                        <ul v-if="tenantContract.defaultDisplayFee.length !=0">
                            <li v-for="val in tenantContract.defaultDisplayFee" :key="val.id">
                                <el-col :span="2">
                                    <label>{{val.name}}</label>
                                </el-col>
                                <el-col :span="5">
                                    <el-select v-model="tenantContractDefaultDisplayFeeTimeVal" placeholder="请选择">
                                        <el-option v-for="item in tenantContractDefaultDisplayFeeTime" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <el-input v-model="tenantContractDefaultDisplayFeeInput" placeholder="请输入内容">
                                        <span slot="suffix">元/月</span>
                                    </el-input>
                                </el-col>
                            </li>
                        </ul>
                        <p v-else>无</p>

                    </el-form-item>

                    <el-form-item>
                        <span slot="label">押金
                            <a @click="depositDialog=true"> +增加</a>
                        </span>
                        <el-checkbox-group v-model="tenantContractDeposit">
                            <div v-for="(deposit,index) in tenantContract.deposit" :key="deposit.id">
                                <el-checkbox :label="deposit.name" :checked="deposit.isChecked">{{deposit.name}} </el-checkbox>
                                <i @click="checkDefault(tenantContract.deposit,index,tenantContractExtraCharges,'tenantContractDefaultDisplayDeposit')" :class='deposit.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="默认显示押金">
                        <ul v-if="tenantContract.defaultDisplayDeposit.length !=0">
                            <li v-for="val in tenantContract.defaultDisplayDeposit" :key="val.id">
                                <el-col :span="3">
                                    <label>{{val.name}}</label>
                                </el-col>

                                <el-col :span="5">
                                    <el-input v-model="tenantContractDefaultDisplayFeeInput" placeholder="请输入内容">
                                        <span slot="prefix">共</span>
                                    </el-input>
                                </el-col>
                            </li>
                        </ul>
                        <p v-else>无</p>
                    </el-form-item>

                    <el-form-item label="支付时间">
                        <el-checkbox-group v-model="tenantContractPayTime">
                            <div v-for="(payTime,index) in tenantContract.payTime" :key="payTime.id">
                                <el-checkbox :label="payTime.name" :checked="payTime.isChecked">{{payTime.name}}</el-checkbox>
                                <i @click="radioDefault(tenantContract.payTime,index,tenantContractPayTime)" :class='payTime.isDefault?"el-icon-star-on":"el-icon-star-off"'></i>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
            </el-tab-pane>
        </el-tabs>

        <!-- 加收费用 -->
        <el-dialog title="添加项目" :visible.sync="extraChargesDialog" width="30%">

            <div class="addDiv">
                <el-col :span="6">
                    <label>请选择</label>
                </el-col>

                <el-col :span="16">
                    <el-cascader :options="extraChargesDialogSelect" v-model="extraChargesDialogVal" :show-all-levels="false" @change="handleChange">
                    </el-cascader>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="extraChargesDialog = false">取 消</el-button>
                <el-button type="primary" @click="add(tenantContract.extraCharges)">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 押金 -->
        <el-dialog title="提示" :visible.sync="depositDialog" width="30%">
            <div class="addDiv">
                <el-col :span="6">
                    <label>所属项目</label>
                </el-col>

                <el-col :span="16">
                    <el-cascader :options="extraChargesDialogSelect" v-model="extraChargesDialogVal" :show-all-levels="false" @change="handleChange">
                    </el-cascader>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="depositDialog = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <el-popover ref="default" placement="top-start" trigger="hover" content="设置为默认">
        </el-popover>
        <el-popover ref="unDefault" placement="top-start" trigger="hover" content="取消默认">
        </el-popover>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                extraChargesDialog: false,
                depositDialog: false,
                tenantContractNonMonth: [],
                tenantContractWholeMonth: [],
                tenantContractPayment: [],
                tenantContractExtraCharges: [],
                tenantContractDefaultDisplayFee: [],
                tenantContractDeposit: [],
                tenantContractDefaultDisplayDeposit: [],
                tenantContractPayTime: [],
                tenantContractDefaultDisplayFeeTimeVal: [],
                tenantContractDefaultDisplayFeeInput: '',

                dddialogVisible: false,
                hzdialogVisible: false,
                dialogVisible: false,
                addSelect: '',
                addInput: '',
                activeName: 'tenantContract',

                tenantContractDefaultDisplayFeeTime: [{
                        value: "1",
                        label: "1月一付"
                    }, {
                        value: "2",
                        label: "2月一付"
                    },
                    {
                        value: "3",
                        label: "3月一付"
                    }, {
                        value: "4",
                        label: '4月一付'
                    },
                    {
                        value: "5",
                        label: "5月一付"
                    },
                    {
                        value: "6",
                        label: "半年一付"
                    },
                    {
                        value: "12",
                        label: "一年一付"
                    },
                    {
                        value: "13",
                        label: "随租金付"
                    },
                    {
                        value: "14",
                        label: "一次付清"
                    }
                ],
                tenantContract: {
                    nonMonth: [{
                            name: '不设置零散租金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '零散期前置',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '零散期后置',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '零散期前后置(灵活)',
                            isDefault: false,
                            isChecked: false
                        }
                    ],
                    wholeMonth: [{
                            name: '不设置零散租金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '零散期前后置(月末)',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '零散期前后置(灵活)',
                            isDefault: false,
                            isChecked: false
                        }
                    ],
                    deposit: [{
                            name: '常规押金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '门卡押金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '钥匙押金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '家具押金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '家电押金',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '外门卡押金',
                            isDefault: false,
                            isChecked: false
                        }
                    ],
                    payment: [{
                            name: '1月一付',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '2月一付',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '3月一付',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '4月一付',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '半年一付',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '一年一付',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '一次付清',
                            isDefault: false,
                            isChecked: false
                        }
                    ],
                    extraCharges: [{
                            name: '电费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '煤气费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '冷水费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '热水费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '网费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '电视费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '物业费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '维修费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '保洁费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '保险费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '服务费',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '委管费',
                            isDefault: false,
                            isChecked: false
                        }
                    ],
                    defaultDisplayFee: [],
                    defaultDisplayDeposit: [],
                    payTime: [{
                            name: '账单开始前提前',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '账单开始后固定',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '账单开始前固定',
                            isDefault: false,
                            isChecked: false
                        },
                        {
                            name: '账单开始前1个月固定',
                            isDefault: false,
                            isChecked: false
                        }
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
                },
                extraChargesDialogSelect: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                    value: 'yizhi',
                                    label: '一致'
                                },
                                {
                                    value: 'fankui',
                                    label: '反馈'
                                },
                                {
                                    value: 'xiaolv',
                                    label: '效率'
                                },
                                {
                                    value: 'kekong',
                                    label: '可控'
                                }
                            ]
                        },
                        {
                            value: 'daohang',
                            label: '导航',
                            children: [{
                                    value: 'cexiangdaohang',
                                    label: '侧向导航'
                                },
                                {
                                    value: 'dingbudaohang',
                                    label: '顶部导航'
                                }
                            ]
                        }
                    ]
                }],
                extraChargesDialogVal: []
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
            add(path) {
                let extraChargesDialogSelect = this.extraChargesDialogSelect;
                let extraChargesDialogVal = this.extraChargesDialogVal;

                for (let i = 0; i < extraChargesDialogSelect.length; i++) {
                    // console.log(extraChargesDialogSelect[i].children.value)
                    if (
                        extraChargesDialogSelect[i].value ==
                        extraChargesDialogVal[0]
                    ) {
                        for (
                            let j = 0; j < extraChargesDialogSelect[i].children.length; j++
                        ) {
                            if (
                                extraChargesDialogSelect[i].children[j].value ==
                                extraChargesDialogVal[1]
                            ) {
                                for (
                                    let k = 0; k <
                                    extraChargesDialogSelect[i].children[j].children
                                    .length; k++
                                ) {
                                    if (
                                        extraChargesDialogSelect[i].children[j]
                                        .children[k].value ==
                                        extraChargesDialogVal[2]
                                    ) {
                                        console.log(
                                            extraChargesDialogSelect[i].children[j]
                                            .children[k].label
                                        );
                                        path.push({
                                            name: extraChargesDialogSelect[i]
                                                .children[j].children[k].label,
                                            isDefault: false
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                this.extraChargesDialog = false;
            },
            radioDefault(key, index, model) {
                let oldIsDefault = key[index].isDefault;
                let i = model.indexOf(key[index].name);

                for (let i = 0; i < key.length; i++) {
                    key[i].isDefault = false;
                }

                key[index].isDefault = !oldIsDefault;

                if (key[index].isDefault) {

                    model.push(key[index].name)
                }
                console.log(model)

            },
            checkDefault(key, index, model, belong) {
                let oldIsDefault = key[index].isDefault;
                let arr = []

                key[index].isDefault = !oldIsDefault;
                if (key[index].isDefault) {

                    model.push(key[index].name)
                }

                for (let i = 0; i < key.length; i++) {
                    if (key[i].isDefault) {
                        arr.push({
                            name: key[i].name
                        })
                    }

                }
                switch (belong) {
                    case 'tenantContractDefaultDisplayFee':
                        this.tenantContract.defaultDisplayFee = arr;
                        this.tenantContract.defaultDisplayFee = arr;
                        break;
                    case 'tenantContractDefaultDisplayDeposit':
                        this.tenantContract.defaultDisplayDeposit = arr;
                        break;
                }


                arr = []



            },

            save() {
                console.log('save');
            },
            handleChange(value, label) {
                console.log(value);
                console.log(label);
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
            /deep/.el-form-item__content {
                width: 85%;
                float: right;
                li {
                    list-style: none;
                    width: 100%;
                    float: left;
                    margin-bottom: 10px;
                }
            }
        }

        /deep/ label.el-form-item__label {
            width: 110px;

            margin-left: 20px;
            text-align: left;
            span a {
                color: red;
            }
        }

        .el-checkbox-group {
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