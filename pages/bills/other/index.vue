<template>
    <el-container>
        <el-header>
            <div class="page-bill-index">
                <BillStatus/>
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
</template>

<script>
    import {BillStatus, PaymentStatus, ReportPeriod, DataTable} from "~/modules/bill";

    export default {
        components: {
            BillStatus,
            PaymentStatus,
            ReportPeriod,
            DataTable
        },
        data() {
            return {
                input: ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-bill-index {
        display: flex;
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

    .period {
        padding-left: 10px;
        padding-top: 10px;
    }

    .search-input {
        padding-top: 10px;
    }
</style>
