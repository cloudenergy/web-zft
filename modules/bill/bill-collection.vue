<template>
    <div>
        <p class="title">{{ data.room.locationName }}{{ data.room.building }}幢{{ data.room.unit }}单元{{ data.room.roomNumber}}&nbsp;{{ data.room.roomName }}</p>
        <p class="title">{{data.user.name}} {{data.user.accountName}}</p>
        <p class="title">应支付日:{{set(data.dueDate)}}</p>
        <div>
            <el-table :data="data.billItems" style="width: 100%">
                <el-table-column label="账单类型">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper" v-for="item in type" :key="item.id" v-if="scope.row.configId===item.id">
                            {{item.key}}
                        </div>
                        <div v-if="scope.row.configId===121">租金</div>
                        <div v-if="scope.row.configId===123">押金</div>
                    </template>
                </el-table-column>
                <el-table-column label="费用周期" min-width="230">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            {{scope.row.dueDateTime}}至{{scope.row.endDateTime}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="金额">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            {{price(scope.row.amount)}}元
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flexc">
            <div style="flex:3">
                <p>实际支付时间</p>
                <el-date-picker v-model="nowData" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div style="flex:3">
                <p>缴费方式</p>
                <el-select v-model="form.fundChannelId" placeholder="请选择缴费方式" style="width:220px">
                    <el-option :label='item.name' :value='item.id' v-for="item in payRoad" :key="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <div style="margin-top:20px">
            <el-input type="textarea" :rows="2" placeholder="收款备注" v-model="form.remark">
            </el-input>
        </div>
    </div>
</template>

<script>
    import fp from 'lodash/fp';

    export default {
        props: {
            data: {
                required: true
            },
            type: {
                type: Array
            }
        },
        created() {
            this.query()
        },
        watch: {
            data(newVal, oldVal) {
                this.form.fundChannelId = this.defaultFundChannel;
                this.form.remark = '';
                this.amountPrice = 0;
            }
        },
        data() {
            return {
                payRoad: [],
                nowData: this.date(),
                form: {
                    fundChannelId: 0,
                    remark: '',
                    amount: ''
                },
                amountPrice: 0
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
            },
            calculateNum() {
                return this.data.dueAmount
            },
            defaultFundChannel() {
                return fp.get('id')(fp.head(this.payRoad));
            }
        },
        methods: {
            set(time) {
                return new Date(parseInt(time) * 1000).toLocaleDateString().replace(/\//g, "-")
            },
            price(data) {
                return (data / 100).toFixed(2)
            },
            query(data) {
                this.$model('fund_channel')
                    .query({
                        category: 'offline',
                        flow: 'receive'
                    }, {
                        projectId: this.projectId
                    })
                    .then(res => {
                        this.$set(this, 'payRoad', res);
                        this.form.fundChannelId = this.defaultFundChannel;
                    })
            },
            date() {
                return new Date()
            },
            payRent() {
                this.form.paidAt = Date.parse(new Date()) / 1000;
                this.form.amount = this.calculateNum
                this.$model('bill_collection')
                    .create(this.form, {
                        projectId: this.projectId,
                        billId: this.data.id
                    })
                    .then(res => {
                        this.$emit('closeDialog')
                        this.$message.success('收款成功')
                    })
                    .catch(err => {
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .title {
        margin-bottom: 10px;
        font-size: 12px;
        color: #999;
    }

    .flexc {
        margin-top: 40px;
    }
</style>
