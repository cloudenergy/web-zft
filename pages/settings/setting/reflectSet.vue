<template>
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
        <el-form-item label="账户类型" style="width:700px">
            <el-select v-model="form.region" placeholder="账户类型" style="width:100%" size="small" @change="receiveChange">
                <el-option label="支付宝" value="person"></el-option>
                <el-option label="银行账号" value="company"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="账户名称" style="width:700px" prop="name" :rules="[{ required: true, message: '名称不能为空'}]">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <div v-if="form.region==='person'">
            <el-form-item label="支付宝账号" style="width:700px" prop="alipay" :rules="[{ required: true, message: '账号不能为空'},]">
                <el-input v-model="form1.account" size="small"></el-input>
            </el-form-item>
            <el-form-item label="姓名" style="width:700px" prop="linkman" :rules="[{ required: true, message: '姓名不能为空'},]">
                <el-input v-model="form1.linkman" size="small"></el-input>
            </el-form-item>
        </div>
        <div v-if="form.region!=='person'">
            <el-form-item label="银行卡号" style="width:700px" prop="account" :rules="[{ required: true, message: '银行卡号不能为空'},]">
                <el-input v-model="form2.account" size="small"></el-input>
            </el-form-item>
            <el-form-item label="开户银行" style="width:700px" prop="region" :rules="[{ required: true, message: '银行名称不能为空'},]">
                <el-select v-model="form2.region" placeholder="账户类型" style="width:100%" size="small">
                    <el-option label="对公账号" value="shanghai"></el-option>
                    <el-option label="个人账号" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支行名称" style="width:700px" prop="subbranch" :rules="[{ required: true, message: '支行名称不能为空'},]">
                <el-input v-model="form2.subbranch" size="small"></el-input>
            </el-form-item>
            <el-form-item label="账号归属" style="width:700px;">
                <el-select v-model="value" placeholder="请选择" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="请选择" size="small" style="margin-left:33px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="请选择" size="small" style="margin-left:33px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
    export default {
        data() {
            return {
                form: {
                    name: '',
                    region: 'person',
                },
                form1: {
                    account:'',
                    linkman:''
                },
                form2: {
                    account:'',
                    region:'',
                    subbranch:''
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        methods: {
            receiveChange(val) {
                console.log(val)
                if(val==='person') {
                    this.form = {
                        account:'',
                        linkman:'',
                        name:this.form.name,
                        tag:'alipay',
                        region:'person'
                    }
                }else {
                    this.form = {
                        name:this.form.name,
                        account:'',
                        tag:'bank',
                        subbranch:'',
                        region:'company'
                    }
                }
            },
            resetForm() {
                return {
                    
                }
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        console.log(1)

                    } else {
                        console.log('error in submitting ...');
                        return false;
                    }
                });
            }
        }
    }
</script>