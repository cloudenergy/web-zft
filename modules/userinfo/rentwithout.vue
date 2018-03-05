<template>
    <div class="flexc">
        <userInfoImage :contractInfo="contractInfo" />
        <div style="flex:1" class="flexc right-box">
            <el-form ref="form" label-width="80px" style="width:100%">
                <el-form-item label="合同周期">
                    <span class="gray"> {{set(contractInfo.from)}}至{{set(contractInfo.to)}}</span>
                </el-form-item>
                <el-form-item label="账户余额">
                    <span class="gray"> {{price(userInfo.cashAccount.balance)}}元</span>
                </el-form-item>
                <!-- <el-form-item label="今日用量">
                    <span class="gray"> {{price(userInfo.cashAccount.balance)}}度</span>
                </el-form-item> -->
                <el-form-item label="结算类型">
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">收款</el-radio>
                        <el-radio :label="2">退款</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="结算金额">
                    <el-input v-model="input" placeholder="输入结算金额" style="widht:158px;" type="number">
                        <template slot="append">￥</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-select v-model="withOutInfo.transaction.fundChannelId" placeholder="请选择" style="width:100%">
                        <el-option :label='item.name' :value="item.id" v-for="item in payRoad" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结算备注">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" style="min-height:80px">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="flexc footer">
                <div>
                    <span style="margin-right:10px;">退租后房间转为关闭状态</span>
                    <el-radio v-model="withOutInfo.toConfig" label="PAUSED">是</el-radio>
                    <el-radio v-model="withOutInfo.toConfig" label="IDIE">否</el-radio>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operateRent(false)">取 消</el-button>
                    <el-button type="primary" @click="operateRent(true)">退 租</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import userInfoImage from './userInfoImage'
    import startOfYesterday from 'date-fns/start_of_yesterday'
    export default {
        props: {
            id: {
                type: String
            },
            userId: {
                required: true
            },
            roomDevices: {
                required: true
            },
            houseFormat: {
                required: true
            },
            roomId: {
                required: true
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
            },
            reqData() {
                return {'deviceId':this.roomDevices.deviceId}
            },
            newReqData() {
                console.log(this.roomId)
                return {
                    'houseFormat':this.houseFormat,
                    'startDate':Date.parse(startOfYesterday())/1000+21*60*60,
                    'endDate':Date.parse(new Date())/1000,
                    'roomId':this.roomId
                }
            }
        },
        components: {
            userInfoImage
        },
        data() {
            return {
                withOutInfo: this.newModel(),
                input: '',
                textarea: '',
                contractInfo: {
                    user: ''
                },
                payRoad: [],
                radio:2,
                userInfo:{
                    cashAccount:{}
                },
                contractbill:{}
            }
        },
        mounted() {
            this.query(this.id)
        },
        methods: {
            price(data) {
                return (data / 100).toFixed(2)
            },
            set(time) {
                return new Date(parseInt(time) * 1000).toLocaleDateString().replace(/\//g, "-")
            },
            newModel() {
                return {
                    toConfig: 'IDIE',
                    status: 'TERMINATED',
                    transaction: {
                        fundChannelId: 1,
                        remake: ''
                    }
                }
            },
            query(data) {
                this.$model('contracts_info')
                .query({}, {
                    projectId: this.projectId,
                    contractId: data
                })
                .then(res => {
                    this.$set(this, 'contractInfo', res)
                })
                .catch(err => {
                    console.log(err)
                })
                this.$model('fund_channel')
                .query({
                    category: 'all',
                    flow: 'receive'
                }, {
                    projectId: this.projectId
                })
                .then(res => this.$set(this, 'payRoad', res))
                this.$model('user_info')
                .query({},{
                    projectId:this.projectId,
                    userInfoId:this.userId.userId||this.userId.id
                })
                .then(res=>{
                    this.$set(this,'userInfo',res)
                })
                this.$model('contract_bill')
				.query(
					{},
					{
						projectId: this.projectId,
						id: this.userId.id
					}
				)
                .then(data => this.$set(this, 'contractbill', data));
                this.$model('electricity_instructions')
				.patch(this.reqData, {
					projectId: this.projectId,
					id: 'reading'
				})
				.then(res => {
					console.log(res)
				})
				.catch(err=>{
					console.log(err)
                })
                this.$model('reading_equipment')
                .query(this.newReqData,{
                    projectId:this.projectId
                })
            },
            onSubmit() {
                console.log('submit!');
            },
            operateRent(data) {
                this.$emit('operateRent')
                console.log(this.radio)
                if (data) {
                    if (this.radio === 1) {
                        this.withOutInfo.transaction.flow = 'receive'
                        this.withOutInfo.endDate = this.nowData()
                       
                    } else {
                        this.withOutInfo.transaction.flow = 'pay'
                        this.withOutInfo.endDate = this.nowData()
                    }
                    this.withOutInfo.transaction.amount = this.input * 100
                    this.input = ''
                    this.radio = 2
                    this.newModel()
                    this.$model('contracts')
                        .update(this.withOutInfo, {
                            projectId: this.projectId,
                            id: this.contractInfo.id
                        })
                        .then(res => {
                            this.$emit('successInfo')
                            this.$message.success('退租成功')
                        })
                        .catch(err => {
                            this.$message.info('退租失败')

                        })
                }
                this.withOutInfo = this.newModel()
            },
            nowData() {
                return Date.parse(new Date()) / 1000
            }
        }
    }
</script>

<style lang="less" scoped>
    .right-box {
        flex-direction: column;
        justify-content: space-between;
        .footer {
            justify-content: space-between;
            align-items: center;
            padding-left: 12px;
            margin-bottom: 0;
        }
    }
</style>