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
                        <el-select v-model="form.region" placeholder="请选择缴费方式" style="width:100%">
                            <el-option :label='item.name' :value='item.id' v-for="item in payRoad" :key="item.id"></el-option>
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
        created(){
            this.query()
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
            query(data){
                this.$model('fund_channel')
                .query({category:'offline',flow:'receive'},{projectId: this.projectId})
                .then(res=>this.$set(this,'payRoad',res))
            },
            onSubmit(formName) {
                if(this.form.price==""){
                    this.$message.error('请填写金额');
                }else{
                    this.$model('top_up')
                    .patch({amount:this.form.price,contractId:this.userInfo.id,userId:this.userInfo.user.id},{projectId:this.projectId,id:this.payRoad[0].id})
                    .then(res=>{
                        console.log(res)
                        this.$message.success('充值成功');
                        this.$refs[formName].resetFields();
                        this.cleraboth();
                    })
                    .catch(err=>{
                        this.$message('充值失败');
                    })
                }
            },
            onclose(formName) {
                this.cleraboth()
                this.$refs[formName].resetFields();
            },
            cleraboth(){
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