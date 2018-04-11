<template>
    <div class="wallet">
        <div v-if="!applyCash">
            <div>
                <el-tabs v-model="type" @tab-click="change">
                    <el-tab-pane label="我的账户" name="myContracts"></el-tab-pane>
                    <el-tab-pane label="提现设置" name="reflectSet"></el-tab-pane>
                </el-tabs>
            </div>
            <div v-if="type==='myContracts'">
                <p style="font-size:18px;margin-top:20px">账户余额</p>
                <div class="flexc userCountMoney">
                    <p class="price">{{price(balance.balance)}}</p>
                    <el-button type="primary" class="reflect" @click="applyCash=true">申请提现</el-button>
                </div>
                <div class="flexc queryConditions">
                    <goend/>
                    <reflect-type style="margin-left:20px" v-model="selectStatus.type"/>
                    <reflect-status style="margin-left:20px" v-model="selectStatus.status" @input="refreshByStatus"/>
                </div>
                <div class="recordsShow">
                    <el-table :data="withdraw" stripe style="width: 100%">
                        <!--  @row-click='withdrawlInformation' -->
                        <el-table-column prop="date" label="时间" width="300">
                            <template slot-scope="scope">
                                <div>
                                    {{nowDate(scope.row.createdAt*1000)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="金额(￥)" width="180">
                            <template slot-scope="scope">
                                <div>
                                    {{price(scope.row.amount)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="订单号">
                        </el-table-column>
                        <el-table-column prop="type" label="操作方式">
                            <template slot-scope="scope">
                                <div>
                                    人工
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operator.userName" label="操作账号">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <div v-for="(item,index) in list" :key="index" v-if="scope.row.status===item.status">
                                    {{item.value}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remake" label="备注">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-if="type!=='myContracts'">
                <reflectSet/>
            </div>
        </div>
        <div v-if="applyCash" class="applyCash">
            <el-form ref="form" label-width="200px" style="width:100%">
                <el-form-item label="可提现金额">
                    <span class="gray">{{price(balance.balance)}}元</span>
                    <p class="noCash">不可提现金额{{price(balance.frozen)}}元</p>
                </el-form-item>
                <el-form-item label="提现金额">
                    <div style="widht:158px;">
                        <el-input v-model="cashInput" placeholder="输入结算金额" type="number" prop="cashInput" size="small">
                            <template slot="append">￥</template>
                        </el-input>
                    </div>
                    
                </el-form-item>
                <el-form-item label="收款方式">
                    <el-select v-model="fundChannelId" placeholder="请选择" style="width:100%" size="small">
                        <el-option :label='item.name' :value="item.id" v-for="item in fundChannel" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <span class="red">*如遇到问题，请拨打技术支持热线0571-86996727</span>
                </el-form-item>
                <el-form-item label="">
                    <div class="flexc">
                        <el-button type="primary" size="small" @click="applyCashInfo()">提交申请</el-button>
                        <el-button type="info" size="small" @click="applyCash=false">取消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import withdrawlInformation from './withdrawalInformation.vue'
    import goend from '~/modules/flow/goend.vue'
    import reflectSet from './reflectSet.vue'
    import startOfMonth from 'date-fns/start_of_month'
    import endOfDay from 'date-fns/end_of_day'
    import getTime from 'date-fns/get_time'
    import format from 'date-fns/format'
    let startDate = getTime(startOfMonth(new Date())) / 1000
    let endDate = getTime(endOfDay(new Date())) / 1000
    export default {
        components: {
            goend,
            reflectSet
        },
        data() {
            return {
                selectStatus:{
                    type:'',
                    status:''
                },
                type: 'myContracts',
                applyCash:false,
                balance: {
                    balance: 0
                },
                withdraw: null,
                reqData: {
                    startDate,
                    endDate
                },
                cashInput:null,
                list: [{
                    status: 'PENDING',
                    value: '等待处理'
                }, {
                    status: 'AUDITFAILURE',
                    value: '审核失败'
                }, {
                    status: 'PROCESSING',
                    value: '处理中'
                }, {
                    status: 'PROCESSFAILURE',
                    value: '处理失败'
                }, {
                    status: 'DONE',
                    value: '完成'
                }],
                fundChannel:[],
                fundChannelId:''
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId
            }
        },
        created() {
            this.$model('project_balance')
                .query({}, {
                    projectId: this.projectId
                })
                .then(res => this.$set(this, 'balance', res))
            this.flowList()
            // 获取资金渠道
            this.$model('fund_channel')
            .query({flow:'pay'},{projectId:this.projectId})
            .then(res=>{
                this.$set(this, 'fundChannel', res)
            })
        },
        methods: {
            
            price(val) {
                return (val / 100).toFixed(2)
            },
            nowDate(val) {
                return format(val, 'YYYY-MM-DD HH:mm:ss')
            },
            // 申请提现
            applyCashInfo() {
                if(this.cashInput!==null&&this.fundChannelId!=='') {
                    this.$model('project_balance')
                    .update({'balance':this.cashInput*100,fundChannelId:this.fundChannelId},{projectId:this.projectId,id:'withdraw'})
                    .then(res=>{this.$message.success('申请提现成功');this.applyCash=false;this.flowList()})
                    .catch(err=>this.$message('申请提现失败'))
                } else {

                }
            },
            // 提现详情
            withdrawlInformation(val) {
                this.$modal.$emit('open', {
                    comp: withdrawlInformation,
                    title: '提现详情',
                    className: 'withdrawlInformation',
                    data:{
                        val
                    }
                });
            },
            change() {},
            // 提现状态
            refreshByStatus(val) {
                val==='all'?delete this.reqData.status:this.reqData.status=val
                this.flowList()
            },
            // 获取流水列表
            flowList() {
                this.$model('blance_withdraw')
                    .query(this.reqData, {
                        projectId: this.projectId
                    })
                    .then(res => {
                        this.$set(this, 'withdraw', res.data)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .price {
        font-size: 30px;
        font-weight: 300;
        padding: 20px 80px 30px 0;
    }

    .reflect {
        height: 36px;
        width: 128px;
        margin-top: 18px
    }

    .queryConditions {
        margin: 20px 0
    }

    .userCountMoney {
        border-bottom: 1px solid #aaa
    }
    .applyCash{
        width: 600px;
        .gray{
            font-size: 26px;
        }
        .red{
            color:#fd6d6d
        }
        .noCash{
            color:#aaa;
            font-size: 12px;
        }
    }
</style>

<style lang="less">
    .withdrawlInformation>div.el-dialog {
        width: 800px;
    }
</style>
