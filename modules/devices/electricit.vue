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
                    <span v-if="scope.row.details.length!==0">{{ delYTL(scope.row.details[0].device.deviceId) }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="归属账单" min-width="160">
                <template slot-scope="scope"  v-if="scope.row.details.length!==0&&scope.row.details[0].contract!==undefined">
                    <span class="el-dropdown-link devicesuser">
                        {{ scope.row.details[0].contract.userName }}
                    </span>
                    <span style="margin-left: 2px;margin-top:5px">{{ scope.row.details[0].contract.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="起始日期" min-width="160">
                <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.startDate" type="date" placeholder="选择日期" style="width:160px" @input="oldTime(scope.row,scope.$index)" @blur="dateTest()" >
                    </el-date-picker>
                    <br/>
                    <span style="margin-left: 30px;margin-top:5px"  v-if="scope.row.details.length!==0">{{ scope.row.details[0].startScale }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="截止日期" min-width="160">
                <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" style="width:160px" @change="newTime(scope.row,scope.$index)">
                    </el-date-picker>
                    <br>
                    <span style="margin-left: 30px;margin-top:5px" v-if="scope.row.details.length!==0">{{ scope.row.details[0].endScale }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用量" width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.details[0]">{{ scope.row.details[0].usage }}</span>
                </template>
            </el-table-column>
            <el-table-column label="单价/元" width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.details[0]">{{ price(scope.row.details[0].price) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="金额/元" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.details[0]">{{ price(scope.row.details[0].amount) }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import startOfYesterday from 'date-fns/start_of_yesterday'
    import getTime from 'date-fns/get_time'
    export default {
        props: {
            readingElectric: {
                type: Array
            },
            houseFormat: {
                required:true
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
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId
            }  
        },
        methods: {
            price(val) {
                return (val / 100).toFixed(2)
            },
            delYTL(val) {
				return val.replace(/YTL/g,'')
			},
            dateTest(data) {
            },
            oldTime(data, index) {
                this.roomReading(getTime(data.startDate)/1000,getTime(data.endDate)/1000,data.houseId,data.roomId,index)
            },
            roomReading(startDate,endDate,houseId,roomId,index) {
                let roomReadingData = {
                    houseFormat:this.houseFormat,
                    startDate,
                    endDate,
                    houseId,
                    roomId
                }
                this.$model('reading_equipment')
				.query(roomReadingData, {
					projectId: this.projectId
                })
                .then(res=>{
                    if(res.data.length===1) {
                        this.readingElectric[index]=res.data[0]
                    }
                })
            },
            newTime(data, index) {
                this.roomReading(getTime(data.startDate)/1000,getTime(data.endDate)/1000,data.houseId,data.roomId,index)
            },
            computations(newnum, oldnum) {
                return newnum - oldnum;
            },
            computationsPrice(differentnum, price) {
                return differentnum * price
            },
            handleRowHandle(row, event) {
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
