<template>
    <div class="userinfoi" style="font-size:12px">
        <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
            <el-form-item label="姓名" style="font-size:12px" class="test" label-fontSize="12px">
                <el-input v-model="form.name" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="电话" style="font-size:12px">
                <el-input v-model="form.phonenum" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="font-size:12px">
                <el-row>
                    <el-col :span="8">
                        <div class="select-with-label el-input-group">
                            <el-select v-model="form.gender" class="gender prepend-label">
                                <el-option label="男" value="M"></el-option>
                                <el-option label="女" value="F"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-col :span="3">
                <el-select v-model="form.documentType" class="id-type">
                    <el-option v-for="t in idTypes" :label="t.name" :value="t.id" :key="t.id"></el-option>
                </el-select>
            </el-col>
            <el-input v-model="form.idcard" class="inputuser"></el-input>
        </el-form>
    </div>
</template>

<script>
    import {
        Userprofile
    } from './index.js';
    export default {
        components: {
            Userprofile
        },
        data() {
            return {
                labelPosition: 'left',
                form: {
                    name: 'zz',
                    gender: 'M',
                    phonenum: '110',
                    documentType:'身份证',
                    idcard: '119'
                },
                idTypes: [{
                    id: 1,
                    name: '身份证',
                }, {
                    id: 2,
                    name: '护照',
                }, {
                    id: 3,
                    name: '港澳通行证',
                }, {
                    id: 4,
                    name: '台胞证',
                }, {
                    id: 5,
                    name: '居住证',
                }, {
                    id: 6,
                    name: '临时居住证',
                }, {
                    id: 7,
                    name: '营业执照',
                }, {
                    id: 8,
                    name: '其他证件',
                }]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>
<style lang="less" scoped>
    .inputuser {
        width: 200px;
    }

    .el-form-item__label {
        text-aline: left;
    }

    .userinfoi {
        margin-top: 5px;
    }
    .test>label{
        font-size: 12px;
    }
</style>