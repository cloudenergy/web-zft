<template>
    <div class="house-contract">
        <el-row>
            <el-col :span="3">
                <div class="section-label">租期</div>
            </el-col>
            <el-col :span="10">
                <div class="select-with-label el-input-group">
                    <span class="el-input-group__prepend">范围</span>
                    <div class="block lease-start-input prepend-label">
                        <el-date-picker v-model="contract.leaseStart" type="date" placeholder="起租时间">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="lease-end-input">
                <el-date-picker v-model="contract.leaseEnd" type="date" placeholder="退租时间" :picker-options="endOptions">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <div class="section-label">合同描述</div>
            </el-col>
            <el-col :span="9">
                <el-input placeholder="JG4133" v-model="contract.contractNumber">
                    <template slot="prepend">合同编号</template>
                </el-input>
            </el-col>
            <el-col :span="9">
                <div class="select-with-label el-input-group">
                    <span class="el-input-group__prepend">签约日期</span>
                    <div class="block lease-start-input prepend-label">
                        <el-date-picker v-model="contract.signUpDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { addMonths, addYears, calendar } from 'date-fns';

    export default {
    	props: {
    		contract: {
    			required: true
    		}
    	},
    	data() {
    		let contract = this.contract;
    		let date = new Date(contract.leaseStart);
    		return {
    			endOptions: {
    				disabledDate(time) {
    					return time.getTime() < Date.now();
    				},
    				shortcuts: [
    					{
    						text: '半年',
    						onClick(picker) {
    							picker.$emit('pick', addMonths(date, 6).toString());
    						}
    					},
    					{
    						text: '一年',
    						onClick(picker) {
    							picker.$emit('pick', addYears(data, 1).toString());
    						}
    					},
    					{
    						text: '两年',
    						onClick(picker) {
    							picker.$emit('pick', addYears(data, 2).toString());
    						}
    					},
    					{
    						text: '三年',
    						onClick(picker) {
    							picker.$emit('pick', addYears(data, 3).toString());
    						}
    					}
    				]
    			}
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .lease-end-input {
    	margin-left: 20px;
    }

    .select-with-label {
    	display: inline-table;
    	.el-input__inner {
    		border-top-left-radius: 0;
    		border-bottom-left-radius: 0;
    	}
    }

    .section-label {
    	margin-top: 3px;
    }
</style>
