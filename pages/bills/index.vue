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
                    <BillStatus class="status" />
                    <BillType class="bill-type" />
                    <ReportPeriod class="period" />
                    <BillManager class="manager" />
                </div>
            </el-header>
            <el-main>
                <div class="result">
                    <DataTable/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import { Tab } from '~/modules/house';
    import {
    	BillStatus,
    	BillType,
    	ReportPeriod,
    	DataTable,
    	BillManager
    } from '~/modules/bill';

    export default {
    	components: {
    		Tab,
    		BillStatus,
    		BillType,
    		ReportPeriod,
    		BillManager,
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

    .ops-bills {
    	display: flex;
    }

    .result {
    	display: block;
    	&:before {
    		clear: both;
    	}
    }

    .period,
    .bill-type,
    .manager {
    	padding-left: 10px;
    	padding-top: 10px;
    }
</style>
