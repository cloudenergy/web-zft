<template>
    <div class="all">
        <h3>卫生员({{tableData.length}}人)
            <div>
                <el-button>编辑岗位</el-button>
                <!-- <el-button @click="addSteward=true">添加员工</el-button> -->
            </div>
        </h3>
        <div class="tit">
            <el-col :span="3">
                <el-button @click="isShow=true" :type="isShow?'danger':''">在职</el-button>

                <el-button @click="isShow=false" :type="!isShow?'danger':''">离职</el-button>
            </el-col>
            <el-col :span="3">
                <el-input v-model="search" placeholder="请输入内容"></el-input>
            </el-col>
        </div>

        <div v-show="isShow">
            <el-table v-if="tableData.length!=0" :data="tableData" style="width: 100%">

                <el-table-column prop="name" label="姓名">
                </el-table-column>

                <el-table-column prop="nub" label="编号">
                </el-table-column>

                <el-table-column prop="tel" label="电话">
                </el-table-column>

                <el-table-column prop="quarters" label="岗位">
                </el-table-column>

                <el-table-column prop="section" label="部门">
                </el-table-column>

                <el-table-column prop="administer" label="管辖范围">
                </el-table-column>

                <el-table-column prop="operate" label="操作">
                </el-table-column>
            </el-table>
            <el-table v-else>
                暂无数据
            </el-table>
        </div>
        <div v-show="!isShow">
            <el-table v-if="tableData2.length!=0" :data="tableData2" style="width: 100%">

                <el-table-column prop="name" label="姓名">
                </el-table-column>

                <el-table-column prop="nub" label="编号">
                </el-table-column>

                <el-table-column prop="tel" label="电话">
                </el-table-column>

                <el-table-column prop="quarters" label="岗位">
                </el-table-column>

                <el-table-column prop="section" label="部门">
                </el-table-column>

                <el-table-column prop="administer" label="管辖范围">
                </el-table-column>

                <el-table-column prop="operate" label="操作">
                </el-table-column>
            </el-table>
            <el-table v-else>
                暂无数据
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                tableData2: '',
                isShow: true,
                tableData: [],
                addSteward: true,
                stewardName: '',
                stewardName: '',
                stewardTel: '',
                stewardPassWord: '',
                addStewardForm: {
                    username: '',
                    level: '',
                    passWord:''
                }
            };
        },
        computed: {
            projectId() {
                return this.$store.state.user.projectId;
            }
        },
        created() {
            // this.query();
        },
        methods: {
           
        },
        components: {}
    };
</script>

<style lang='less' scoped>
    .all {
        h3 {
            div {
                float: right;
            }
        }
        .tit {
            float: left;
            width: 100%;
            background-color: #e0e7ec;
            padding: 10px 0;
            margin-top: 10px;
        }
    }
</style>