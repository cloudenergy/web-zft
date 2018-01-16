<template>
    <div>
        <div>
            <div class="title">应支付日:{{set(data.dueDate)}}</div>
        </div>
        <div>
            <el-table :data="data.billItems" style="width: 100%">
                <el-table-column label="账单类型">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper" v-for="item in type" :key="item.type" v-if="scope.row.type===item.type">
                            {{item.text}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="费用周期" min-width="230">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            {{set(scope.row.from)}}-{{set(scope.row.to)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="金额">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            {{price(scope.row.amount)}}
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
                <el-select v-model="form.paymentChannel" placeholder="请选择缴费方式" style="width:220px">
                    <el-option :label='item.name' :value='item.tag' v-for="item in payRoad" :key="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <div style="margin-top:20px">
            <el-input type="textarea" :rows="2" placeholder="收款备注" v-model="form.remake">
            </el-input>
        </div>
    </div>
</template>

<script>
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
                this.form.paymentChannel = 'cash',
                    this.form.remake = '',
                    this.amountPrice = 0
            }
        },
        data() {
            return {
                payRoad: [],
                nowData: this.date(),
                form: {
                    paymentChannel: 'cash',
                    remake: '',
                    amount: ''
                },
                amountPrice: 0
            }
        },
        computed: {
            projectId() {
                return this.$store.state.user.projectId;
            },
            calculateNum() {
                this.data.billItems.map((val, index) => {
                    this.amountPrice = this.amountPrice + val.amount
                })
                return this.amountPrice
            }
        },
        methods: {
            set(time) {
                return new Date(parseInt(time) * 1000).toLocaleDateString().replace(/\//g, "-")
            },
            price(data) {
                return data / 100
            },
            query(data) {
                this.$model('fund_channel')
                    .query({
                        category: 'offline',
                        flow: 'receive'
                    }, {
                        projectId: this.projectId
                    })
                    .then(res => this.$set(this, 'payRoad', res))
            },
            date() {
                return new Date()
            },
            payRent() {
                this.form.paidAt = Date.parse(new Date());
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
                        console.log(err)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .title {
        line-height: 40px;
    }

    .flexc {
        margin-top: 40px;
    }
</style>