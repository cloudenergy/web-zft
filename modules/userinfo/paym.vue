<template>
    <div>
        <div class="flexc doublechec">
            <userInfoImage :contractInfo="contractInfo" />
            <div class="paymway flexc">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="当前余额" prop="price">
                        <p :style="{color:contractInfo.user.cashAccount.balance<2000?'#f03d53':'#000'}">{{price(contractInfo.user.cashAccount.balance)}}</p>
                    </el-form-item>
                    <el-form-item label="充值金额" prop="price">
                        <el-input v-model="form.price" auto-complete="off" size="small" ref="input" @input="upddateValue"></el-input>
                    </el-form-item>
                    <el-form-item label="充值方式">
                        <el-select v-model="form.region" placeholder="请选择缴费方式" style="width:100%" size="small">
                            <el-option :label='item.name' :value='item.id' v-for="item in payRoad" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.desc" size="medium"></el-input>
                    </el-form-item>
                </el-form>
                <div class="flexc onsub">
                    <el-button type="primary" @click="onSubmit('form')">立即充值</el-button>
                    <el-button @click="onClose('form')">取消</el-button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import userInfoImage from './userInfoImage.vue'
    const calc = require('calculatorjs')
    export default {
        props: {
            contractInfo: {
                type: Object
            }
        },
        components: {
            userInfoImage
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
            }
        },
        created() {
            this.query()
        },
        data() {
            var checkPrice = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入金额'))
                } else if (parseInt(value * 100) !== calc.mul(value, 100)) {
                    return callback(new Error('金额输入错误'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    "price": '',
                    "region": 1,
                    "desc": ''
                },
                payRoad: '',
                rules: {
                    price: [{
                        validator: checkPrice,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            upddateValue(value) {
                var formattedValue = value
                    // 删除两侧的空格符
                    .trim()
                    // 保留 2 位小数
                    .slice(
                        0,
                        value.indexOf('.') === -1 ?
                        value.length :
                        value.indexOf('.') + 3
                    )
                // 如果值尚不合规，则手动覆盖为合规的值
                if (formattedValue !== value) {
                    this.$nextTick(() => {
                        this.form.price = formattedValue;
                    })
                }
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
                    .then(res => this.$set(this, 'payRoad', res))
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$model('top_up')
                        .patch({
                            amount: this.form.price * 100,
                            fundChannelId: this.form.region
                        }, {
                            projectId: this.projectId,
                            userId: this.contractInfo.user.id,
                            id: 'balance'
                        })
                        .then(res => {
                            this.$message.success('充值成功');
                            this.$refs[formName].resetFields();
                            this.clearBoth();
                        })
                        .catch(err => {
                            this.$message('充值失败');
                        })
                    } else {
                        return false;
                    }
                });
            },
            onClose(formName) {
                this.clearBoth()
                this.$refs[formName].resetFields();
            },
            clearBoth() {
                this.$modal.$emit('dismiss');
                this.form.desc = ""
            }
        }

    }
</script>


<style lang="less" scoped>
    .doublechec {
        justify-content: space-between;
    } // .paymuser {
    //     width: 180px;
    //     text-align: center;
    //     border: 1px solid #aaa;
    //     padding:10px;
    //     .paymUserInfo {
    //         border-top: 1px solid #ccc;
    //         text-align:left;
    //         color:#888;
    //         div{
    //             margin-top: 3px;
    //         }
    //         p:first-child {
    //             color:#333;
    //         }
    //     }
    //     .others{
    //         height: 100px;
    //     }
    // }
    .paymway {
        flex: 1;
        margin-left: 30px;
        flex-direction: column;
        justify-content: space-between;
    }

    .onsub {
        flex-direction: row-reverse;
        button {
            margin-left: 20px;
        }
    }
</style>

//
<style lang="less">
    //     .paymuser i {
    //         width: 75px;
    //         height: 75px;
    //         svg{
    //             width: 75px;
    //             height: 75px;
    //         }
    //     }
    //
</style>