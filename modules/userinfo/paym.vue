<template>
    <div>
        <div class="flexc doublechec">
            <div class="paymuser">
                <!-- <img src="../../public/icon.png" alt=""> -->
                <img src="" alt="">
                <div style="text-align:center">
                    <p>张三丰</p>
                    <p>987689768976</p>
                    <p>当前余额</p>
                    <p>￥-3444</p>
                </div>
            </div>
            <div class="paymway">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="缴费方式">
                        <el-select v-model="form.region" placeholder="请选择缴费方式" style="width:100%">
                            <el-option label="现金" value="1"></el-option>
                            <el-option label="银行转账" value="2"></el-option>
                            <el-option label="POS刷卡" value="3"></el-option>
                            <el-option label="支票" value="4"></el-option>
                            <el-option label="账扣" value="5"></el-option>
                            <el-option label="冲正" value="6"></el-option>
                            <el-option label="其他" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="缴费金额" prop="price" :rules="[
                        { required: true, message: '金额不能为空'},
                        { type: 'number', message: '金额必须为数字值'}
                        ]">
                        <el-input v-model.number="form.price" auto-complete="off" type="number"></el-input>
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
    export default {
        props: {
            userrentinfo: {
                type: Object
            }
        },
        data() {
            return {
                form: {
                    "price": '',
                    "region": '1',
                    "desc": ''
                }
            }
        },
        methods: {
            onSubmit(formName) {
                if(this.form.price==""){
                    this.$message.error('请填写金额');
                }else{
                    // console.log(JSON.parse(this.form))
                    console.log(JSON.stringify(this.form))
                    this.$message.success('记入账单成功');
                    this.$refs[formName].resetFields();
                    this.cleraboth();
                }
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                //     });
            },
            onclose(formName) {
                // this.$refs['form'].resetFields();
                this.cleraboth()
                this.$refs[formName].resetFields();
            },
            cleraboth(){
                this.$modal.$emit('dismiss');
                this.form.region= "1"
                this.form.desc = ""
            }
        }

    }
</script>


<style lang="less" scoped>
    .doublechec {
        justify-content: space-between;
    }

    .paymuser {
        width: 200px;
        text-align: center;
        border-right: 1px solid #aaa;
        img {
            width: 130px;
            height: 130px;
        }
    }

    .paymway {
        flex: 1
    }

    .onsub {
        flex-direction: row-reverse;
        margin-top: 20px;
        button {
            margin: 0 10px;
        }
    }
</style>