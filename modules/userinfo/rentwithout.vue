<template>
    <div class="flexc">
        <userInfoImage :contractInfo="contractInfo" />
        <div style="flex:1" class="flexc right-box">
            <el-form ref="form" label-width="80px" style="width:100%">
                <el-form-item label="合同周期">
                    <span class="gray"> {{set(contractInfo.from)}}-{{set(contractInfo.to)}}</span>
                </el-form-item>
                <el-form-item label="账户余额">
                    <span class="gray"> {{price(cashAccount.balance)}}</span>
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
                    <el-button type="primary" @click="operateRent(true)">确 定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import userInfoImage from './userInfoImage'
    export default {
        props: {
            id: {
                type: String
            },
            cashAccount: {
                required: true
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
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
                payRoad: []
            }
        },
        mounted() {
            this.query(this.id)
        },
        methods: {
            price(data) {
                return data / 100
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
            },
            onSubmit() {
                console.log('submit!');
            },
            operateRent(data) {
                this.$emit('closeDialog')
                if (data) {
                    if (this.input >= 0) {
                        this.withOutInfo.transaction.flow = 'receive'
                        this.withOutInfo.endDate = this.nowData()
                        this.withOutInfo.transaction.amount = this.input * 100

                    } else {
                        this.withOutInfo.transaction.flow = 'pay'
                        this.withOutInfo.endDate = this.nowData()
                        this.withOutInfo.transaction.amount = -this.input * 100
                    }
                    this.input = ''
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