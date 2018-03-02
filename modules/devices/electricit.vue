<template>
    <div>
        <!-- TODO ZHOUYI  自动抄表接口返回 -->
        <el-table :data="readingElectric" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands" @row-click='handleRowHandle'
            ref="tableData" v-if="readingElectric.length!==0">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.instrument }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="房源" min-width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.location.district }}{{ scope.row.location.name }}</span>
                    <br>
                    <span style="margin-top:5px">{{ scope.row.building }}幢{{ scope.row.unit }}单元{{ scope.row.roomNumber }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="仪表名称/ID" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.details.length!==0">{{ scope.row.details[0].device.deviceId }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="归属账单" min-width="160">
                <template slot-scope="scope">

                    <span class="el-dropdown-link devicesuser" v-if="scope.row.details.length!==0">
                        {{ scope.row.details[0].contract.userName }}
                    </span>
                    <span style="margin-left: 2px;margin-top:5px"  v-if="scope.row.details.length!==0">{{ scope.row.details[0].contract.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="往次抄表" min-width="160">
                <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.startDate" type="date" placeholder="选择日期" style="width:160px" @input="oldTime(scope.row)" @blur="dateTest()">
                    </el-date-picker>
                    <br/>
                    <span style="margin-left: 30px;margin-top:5px"  v-if="scope.row.details.length!==0">{{ scope.row.details[0].startScale }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="本次抄表" min-width="160">
                <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" style="width:160px" @change="newTime(scope.row)">
                    </el-date-picker>
                    <br>
                    <span style="margin-left: 30px;margin-top:5px" v-if="scope.row.details.length!==0">{{ scope.row.details[0].endScale }}</span>
                </template>
            </el-table-column>
            <el-table-column label="差值">
                <template slot-scope="scope">
                    <span>{{ scope.row.differentnum }}</span>
                </template>
            </el-table-column>
            <el-table-column label="单价">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.unitprice }}</span>
                </template>
            </el-table-column>
            <el-table-column label="账单">
                <template slot-scope="scope">
                    <span>{{ scope.row.bill }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import startOfYesterday from 'date-fns/start_of_yesterday'
    export default {
        props: {
            readingElectric: {
                type: Array
            }
        },
        data() {
            return {
                valueuser: '',
                // 获取row的key值
                getRowKeys(row) {
                    return row.userid;
                },
                // 要展开的行，数值的元素是row的key值
                expands: [],
                // readingElectricData:[{startDate:'0',endDate:'0'}]
            }
        },
        methods: {
            dateTest(data) {
                console.log(data)
                
            },
            oldTime(data) {
                console.log(data)
                data.lastnum = 11111;
                data.differentnum = this.computations(data.thisnum, data.lastnum)
                data.bill = this.computationsPrice(data.differentnum, data.unitprice)
            },
            newTime(data) {
                data.thisnum = 999999;
                data.differentnum = this.computations(data.thisnum, data.lastnum)
                data.bill = this.computationsPrice(data.differentnum, data.unitprice)
            },
            computations(newnum, oldnum) {
                return newnum - oldnum;
            },
            computationsPrice(differentnum, price) {
                return differentnum * price
            },
            handleRowHandle(row, event) {
                // if (event.path[0].tagName != 'INPUT') {
                //     this.toggle(row.userid)
                // }
                console.log(row.startDate,row.endDate)
            },
            // 展开
            toggle(flowi) {
                this.$refs.tableData.toggleRowExpansion(this.tableData.find(d => d.userid == flowi))
            }
        }
    }
</script>

<style lang="less" scoped>
    input.choose {
        border: 1px solid transparent;
    }

    .devicesuser {
        display: inline-block;
        width: 100%;

    }
</style>
<style>
    .no-border>.el-input>.el-input__inner {
        border: 1px solid transparent;
        padding: 0;
        background-color: none;
    }
</style>
