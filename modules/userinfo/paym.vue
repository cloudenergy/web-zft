<template>
    <div>
        <div class="flexc doublechec">
            <userInfoImage :contractInfo="contractInfo"/>
            <div class="paymway">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="当前余额" prop="price">
                        <p :style="{color:contractInfo.user.cashAccount.balance<2000?'#f03d53':'#000'}">{{price(contractInfo.user.cashAccount.balance)}}</p>
                    </el-form-item>
                    <el-form-item label="缴费金额" prop="price">
                        <el-input v-model.number="form.price" auto-complete="off" type="number" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="缴费方式">
                        <el-select v-model="form.region" placeholder="请选择缴费方式" style="width:100%" size="small">
                            <el-option :label='item.name' :value='item.id' v-for="item in payRoad" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.desc" size="medium"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="flexc onsub">
            <el-button @click="onclose('form')">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">立即缴费</el-button>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import userInfoImage from './userInfoImage.vue'
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
                } else if (parseInt(value * 100) !== value * 100) {
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
                                contractId: this.contractInfo.id,
                                id: 'balance'
                            })
                            .then(res => {
                                this.$message.success('充值成功');
                                this.$refs[formName].resetFields();
                                this.cleraboth();
                            })
                            .catch(err => {
                                this.$message('充值失败');
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onclose(formName) {
                this.cleraboth()
                this.$refs[formName].resetFields();
            },
            cleraboth() {
                this.$modal.$emit('dismiss');
                this.form.desc = ""
            }
        }

    }
</script>


<style lang="less" scoped>
    .doublechec {
        justify-content: space-between;
    }

    // .paymuser {
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
        margin-left:30px
    }

    .onsub {
        flex-direction: row-reverse;
        margin-top: 20px;
        button {
            margin: 0 10px;
        }
    }
</style>

// <style lang="less">
//     .paymuser i {
//         width: 75px;
//         height: 75px;
//         svg{
//             width: 75px;
//             height: 75px;
//         }
//     }
// </style>
