<template>
    <el-container>
        <el-aside class="page-bill-index">
            <div>
                <Tab/>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <div class="ops-bills">
                    <BillStatus class="status"/>
                    <div class="separator"></div>
                    <PaymentStatus/>
                    <div class="separator"></div>
                    <ReportPeriod class="period"/>

                </div>
            </el-header>
            <el-main>
                <div class="result">
                    <el-input placeholder="搜索" v-model="input" class="search-input"></el-input>
                    <DataTable/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {Tab} from '~/modules/house'
    import {BillStatus, PaymentStatus, ReportPeriod, DataTable} from '~/modules/bill'
    import ElCol from 'element-ui/packages/col/src/col';

    export default {
        components: {
            ElCol,
            Tab,
            BillStatus,
            PaymentStatus,
            ReportPeriod,
            DataTable
        },
        data() {
            return {
                input: ''
            };
        }
    };
</script>

<style lang="less" scoped>
    .page-bill-index {
        display: flex;
        min-width: 275px;
    }

    .separator {
        display: block;
        height: 60px;
        width: 1px;
        position: relative;
        &:before {
            content: ' ';
            position: absolute;
            border-left: 1px solid #d2d2d2;
            height: 60%;
            top: 20%;
            box-sizing: border-box;
        }
    }

    .ops-bills {
        display: flex;
    }

    .result {
        display: block;
        &:before {
            clear: both;
        }
    }

    .period {
        padding-left: 10px;
        padding-top: 10px;
    }

    .search-input {
        padding-top: 10px;
    }
</style>
