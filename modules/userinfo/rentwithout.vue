<template>
    <div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>合同周期 </span>
                <span class="gray"> {{set(contractInfo.from)}}-{{set(contractInfo.to)}}</span>
            </div>
            <div class="right-menu">
                <span style="margin-right:10px;">退租后房间转为关闭状态</span>
                <el-radio v-model="withOutInfo.toConfig" label="PAUSED">是</el-radio>
                <el-radio v-model="withOutInfo.toConfig" label="IDIE">否</el-radio>
            </div>
        </div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>租户姓名 </span>
                <span v-if="contractInfo.user.name" class="gray"> {{contractInfo.user.name}}</span>
            </div>
            <div>

            </div>
        </div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>租户账号 </span>
                <span v-if="contractInfo.user.name" class="gray"> {{contractInfo.user.accountName}}</span>
            </div>
            <div class="right-menu">
                <span class="set-width">支付方式</span>
                <el-select v-model="withOutInfo.transaction.fundChannelId" placeholder="请选择" style="width:220px">
                    <el-option :label='item.name' :value="item.id" v-for="item in payRoad" :key="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>当前余额 </span>
                <span class="gray"> {{price(cashAccount.balance)}}</span>
            </div>
            <div class="flexc setInput right-menu">
                <span class="set-width">结算余额</span>
                <el-input v-model="input" placeholder="输入结算金额" style="widht:158px;" type="number">
                    <template slot="append">￥</template>
                </el-input>
                <span class="hint">正数表示收款，负数表示退款</span>
            </div>
        </div>
        <div>
            <div class="flexc setElementHeight">
                <span style="display:inline-block;width:70px">
                    结算备注
                </span>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" style="min-height:80px">
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        props: {
            id: {
                type: String
            },
            cashAccount: {
                required:true
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
            }
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
                return data/100
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
            operateRent() {
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
                this.withOutInfo = this.newModel()
            },
            nowData() {
                return Date.parse(new Date()) / 1000
            }
        }
    }
</script>
<style lang="less" scoped>
    .flexc {
        margin-bottom: 15px;
        .exit-house-left {
            width: 50%;
        }
        .right-menu{
            width: 350px;
        }
        .set-width {
            display: inline-block;
            width: 130px;
        }
        .setInput {
            position: relative;
            .hint {
                color: #bbb;
                font-size: 12px;
                position: absolute;
                bottom: -22px;
                right: 0;
            }
        }
        .gray{
            color:#aaa
        }
    }
</style>
<style>
    .flexc.setInput>.el-input.el-input--mini {
        width: 220px;
    }

    .setElementHeight .el-textarea__inner {
        height: 100%;
    }
</style>