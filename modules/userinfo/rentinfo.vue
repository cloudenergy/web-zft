<template>
    <div class="userinfoi" style="font-size:12px">
        <el-form ref="form" :model="form" label-width="130px" :label-position="labelPosition">
            <el-form-item label="姓名" style="font-size:12px" class="test" label-fontSize="12px">
                <el-input v-model="form.user.name" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="电话" style="font-size:12px">
                <el-input v-model="form.user.mobile" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="font-size:12px">
                <el-row>
                    <el-col :span="8">
                        <div class="select-with-label el-input-group">
                            <el-select v-model="form.user.gender" class="gender prepend-label" style="width:200px">
                                <el-option label="男" value="M"></el-option>
                                <el-option label="女" value="F"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-select v-model="form.user.documentType" class="id-type" style="width:120px;margin-right:10px">
                <el-option v-for="t in idTypes" :label="t.name" :value="t.id" :key="t.id"></el-option>
            </el-select>

            <el-input v-model="form.user.documentId" class="inputuser"></el-input>
        </el-form>
        <div class="flexcenter" style="width:330px;margin-top:10px">
            <el-button type="text" @click="resetPassword()">重置密码</el-button>
            <el-button type="primary" @click="updateuser()">更改</el-button>
        </div>
        
    </div>
</template>

<script>
    import {
        Userprofile
    } from './index.js';

    export default {
        computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			}
		},
        props: {
            form: {
                type: Object
            }
        },
        components: {
            Userprofile
        },
        data() {
            return {
                labelPosition: 'left',
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
        mounted() {

        },
        methods: {
            updateuser() {
                this.$model('userInfoChange')
                .patch({
                    mobile:this.form.user.mobile,
                    documentId: this.form.user.documentId,
                    documentType: this.form.user.documentType,
                    gender: this.form.user.gender,
                    name: this.form.user.name
                },{
                    projectId:this.projectId,
                    id: this.form.userId
                })
                .then(res=>{
                    this.$message.success('信息更新成功')
                })
                .catch(err=>{this.$message('信息更新失败')})
            },
            // 重置密码
            resetPassword() {
                this.$confirm('将要重置用户密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$model('userInfoChange')
                    .update({
                        
                    },{
                        projectId:this.projectId,
                        id: this.form.userId
                    })
                    .then(res=>{
                        this.$message.success('密码重置成功')
                    })
                    .catch(err=>{this.$message('密码重置失败')})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
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

    .test>label {
        font-size: 12px;
    }
</style>