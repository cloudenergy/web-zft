<template>
    <div>
        <div>
            <el-tabs v-model="type" @tab-click="change">
                <el-tab-pane label="我的账户" name="myContracts"></el-tab-pane>
                <el-tab-pane label="提现设置" name="reflectSet"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="type==='myContracts'">
            <span>账户余额</span>
            <div class="flexc">
                <h2>88888元</h2>
                <el-button type="primary" plain>申请提现</el-button>
            </div>
            <div class="flexc">
                <goend/>
                <reflect-type/>
                <reflect-status/>
            </div>
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="时间" width="300">
                    </el-table-column>
                    <el-table-column prop="price" label="金额" width="180">
                    </el-table-column>
                    <el-table-column prop="idNum" label="订单号">
                    </el-table-column>
                    <el-table-column prop="type" label="操作方式">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作账号">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column prop="remake" label="备注">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-if="type!=='myContracts'">
            <reflectSet/>
        </div>
    </div>
</template>
<script>
    import goend from '~/modules/flow/goend.vue'
    import reflectSet from './reflectSet.vue'
    export default {
        components: {
            goend,reflectSet
        },
        data() {
            return {
                type: 'myContracts',
                tableData:[]
            }
        },
        methods: {
            change() {
                console.log('change')
            }
        }
    }
</script>

<style lang="less" scoped>
</style>