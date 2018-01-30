<template>
    <div>
        <div>
            <el-tabs v-model="type" @tab-click="change">
                <el-tab-pane label="我的账户" name="myContracts"></el-tab-pane>
                <el-tab-pane label="提现设置" name="reflectSet"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="type==='myContracts'">
            <p style="font-size:18px;margin-top:20px">账户余额</p>
            <div class="flexc userCountMoney">
                <p class="price">212930</p>
                <el-button type="primary" class="reflect">申请提现</el-button>
            </div>
            <div class="flexc queryConditions">
                <goend/>
                <reflect-type style="margin-left:20px"/>
                <reflect-status style="margin-left:20px"/>
            </div>
            <div class="recordsShow">
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
    .price{
        font-size: 30px;
        font-weight: 300;
        padding: 20px 80px 30px 0;
    }
    .reflect{
        height: 36px;
        width: 128px;
        margin-top: 18px
    }
    .queryConditions{
        margin: 20px 0
    }
    .userCountMoney{
        border-bottom: 1px solid #aaa
    }
</style>