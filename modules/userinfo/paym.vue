<template>
    <div>
        <div class="flexc doublechec">
            <div class="paymuser">
                <!-- <img src="../../public/icon.png" alt=""> -->
                <img src="" alt="">
                <div style="text-align:center">
                    <p @click="show">{{userInfo.user.name}}</p>
                    <p>{{userInfo.user.accountName}}</p>
                    <p>当前余额</p>
                    <p>￥-3444</p>
                </div>
            </div>
            <div class="paymway">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="缴费方式">
                        <el-select v-model="form.region" placeholder="请选择缴费方式" style="width:100%" @change="choosePay">
                            <el-option label="现金" value="manual"></el-option>
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
    import axios from 'axios'
    export default {
        props: {
            userInfo: {
                type: Object
            }
        },
        computed: {
    		projectId() {
    			return this.$store.state.user.projectId;
    		}
    	},
        data() {
            return {
                form: {
                    "price": '',
                    "region": '',
                    "desc": ''
                },
                payRoad:''
            }
        },
        methods: {
            show(){
                console.log(this.userInfo,this.payRoad)
            },
            choosePay(data){
                console.log(data)
                this.$model('fund_channel')
                .query({flow:'receive',tag:data},{projectId: this.projectId})
                .then(res=>this.$set(this,'payRoad',res))
            },
            onSubmit(formName) {
                if(this.form.price==""){
                    this.$message.error('请填写金额');
                }else{
                    
                    this.$message.success('记入账单成功');
                    this.$refs[formName].resetFields();
                    this.cleraboth();
                }
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
            },
            payUrl(){
                const url = 'http://localhost:8080/api/v1.0/project/'
                return `${url}${this.projectId}${'/fundChannels/'}${this.payRoad[0].id}`
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