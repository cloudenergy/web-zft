<template>
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
        <el-form-item label="账户类型" style="width:700px">
            <el-select v-model="region" placeholder="账户类型" style="width:100%" size="small" @change="receiveChange">
                <el-option label="支付宝" value="person"></el-option>
                <el-option label="银行账号" value="company"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="账户名称" style="width:700px" prop="name">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <div v-if="region==='person'">
            <el-form-item label="支付宝账号" style="width:700px" prop="alipay">
                <el-input v-model="form.account" size="small"></el-input>
            </el-form-item>
            <el-form-item label="姓名" style="width:700px" prop="linkman">
                <el-input v-model="form.linkman" size="small"></el-input>
            </el-form-item>
        </div>
        <div v-if="region!=='person'" class="attributionSelection">
            <el-form-item label="银行卡号" style="width:700px" prop="account">
                <el-input v-model="form.account" size="small"></el-input>
            </el-form-item>
            <el-form-item label="开户银行" style="width:700px" prop="region">
                <el-select v-model="form.tag" placeholder="账户类型" style="width:100%" size="small" filterable>
                    <el-option v-for="item in banks" :key="item.tag" :label="item.name" :value="item.tag"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支行名称" style="width:700px" prop="subbranch">
                <el-input v-model="form.subbranch" size="small"></el-input>
            </el-form-item>
            <el-form-item label="账号归属" style="width:700px;">
                <el-select v-model="form.locate.province" placeholder="请选择" size="small" @change="provinceChange">
                    <el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="form.locate.city" placeholder="请选择" size="small" style="margin-left:33px;" @change="cityChange">
                    <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="form.locate.district" placeholder="请选择" size="small" style="margin-left:33px;" @change="districtChange">
                    <el-option v-for="item in county" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交审核</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import { fromPairs, map } from 'lodash'
    export default {
        data() {
            return {
                region: 'person',
                form: {
                    name: '',
                    flow: 'pay',
                    tag:'alipay'
                },
                form1: {
                    account:'',
                    linkman:''
                },
                form2: {
                    account:'',
                    subbranch:''
                },
                province:[],
                city:[],
                county:[],
                value: '',
                banks:[]
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId
            }
        },
        created() {
            this.cityChoose(1,'province')
            this.$model('environments')
            .then(env => fromPairs(map(env, i => [i.key, i.value])))
            .then(env=>{this.$set(this,'banks',env.banks)})
        },
        methods: {
            provinceChange(val) {
                this.province.forEach(element => {
                    if(element.id===val) {
                        this.form.locate.province = element.name
                    }
                })
                this.cityChoose(2,'city',val)
            },
            cityChange(val) {
                this.city.forEach(element => {
                    if(element.id===val) {
                        this.form.locate.city = element.name
                    }
                })
                this.cityChoose(3,'county',val)
            },
            districtChange(val) {
                this.county.forEach(element => {
                    if(element.id===val) {
                        this.form.locate.district = element.name
                    }
                })
            },
            cityChoose(level,setCity,id) {
                this.$model('districts',{level,cityId:id})
                .then(res=>{
                    this.$set(this,setCity,res.result)
                })
            },
            receiveChange(val) {
                if(val==='person') {
                    this.form = {
                        account:'',
                        linkman:'',
                        name:this.form.name,
                        tag:'alipay',
                        flow:'pay'
                    }
                }else {
                    this.form = {
                        name:this.form.name,
                        account:'',
                        tag:'',
                        subbranch:'',
                        flow:'pay',
                        locate:{}
                    }
                }
            },
            resetForm() {
                return {
                    
                }
            },
            onSubmit() {
                this.$model('fund_channel')
                .create(this.form,{projectId:this.projectId})
                .then(res=>this.$message.success('提交审核成功'))
                .catch(err=>this.$message('提交审核失败'))
            }
        }
    }
</script>
<style lang="less">
    .attributionSelection {
        .el-select.el-select--small {
            width: 178px;
        }
    }
</style>
