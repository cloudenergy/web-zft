<template>
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
         <el-form-item label="账户类型" style="width:600px">
            <el-select v-model="form.region" placeholder="账户类型" style="width:100%" size="small">
                <el-option label="对公账号" value="shanghai"></el-option>
                <el-option label="个人账号" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="账户名称" style="width:600px">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" style="width:600px">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" style="width:600px">
            <el-select v-model="form.region" placeholder="账户类型" style="width:100%" size="small">
                <el-option label="对公账号" value="shanghai"></el-option>
                <el-option label="个人账号" value="beijing"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="支行名称" style="width:600px">
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
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
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>