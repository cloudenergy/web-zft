<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="房源" min-width="175">
                <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                    <br>
                    <span>{{ scope.row.addressdet }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="归属账单" min-width="180">
                <template slot-scope="scope">
                    <el-dropdown style="width:90%" @command="handleCommand">
                    <span class="el-dropdown-link devicesuser">
                        {{scope.row.user[0].label}}userId<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- @@@需要返还userId -->
                        <el-dropdown-item v-for="item in scope.row.user" :key="item.value" :command="item.value">
                            {{item.label}} {{item.value}}
                            <br>
                            {{item.from}}至{{item.to}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                    <br>
                    <!-- @@@时间，等数据传回来 -->
                    <span style="margin-left: 2px;margin-top:5px">{{ scope.row.userid }}</span>
                </template>
            </el-table-column>
            <el-table-column label="往次抄表" min-width="140">
                <template slot-scope="scope">
                    <p>{{scope.row.setdata}}</p>
                    <span>{{ scope.row.lastnum }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="本次抄表" min-width="150">
                <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.setdata"
                            type="date"
                            placeholder="选择日期"
                            style="width:130px"
                            :picker-options="scope.row.pickerOptions"
                            @change="test">
                        </el-date-picker>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="本次抄表" min-width="150">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.readnum" style="width:130px"></el-input>
                </template>
            </el-table-column>
            <!-- <el-table-column label="仪表读数">
                <template slot-scope="scope">
                    <span>{{ scope.row.thisnum }}</span>
                    <el-input v-model="scope.row.readnum" v-if="scope.row.thisnum==''"></el-input>
                    <span style="opacity:0">1</span>
                </template>
            </el-table-column> -->
            <el-table-column label="差值">
                <template slot-scope="scope">
                    <span>{{ scope.row.differentnum }}</span>
                </template>
            </el-table-column>
            <el-table-column label="单价" min-width="60">
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
        <el-button type="primary" style="margin-top:15px;float:right" @click="savech">全部保存</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                valueuser: '',
                tableData: [{
                        address: '上海市普陀区金沙江路',
                        addressdet: '12栋2单元1202',
                        user: [{
                                value: '1',
                                label: '赵世浩',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                            {
                                value: '0',
                                label: '未分配',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                        ],
                        currentuser: '0',
                        userid: '110',
                        instrument: '仪表001',
                        instrumentid: '000000000021',
                        lastdateall: [{
                                value: '12312fsd',
                                label: '2016-05-02'
                            },
                            {
                                value: '1asdf',
                                label: '2016-05-02'
                            },
                            {
                                value: '212',
                                label: '2016-05-02'
                            },
                            {
                                value: '3324423',
                                label: '2016-05-02'
                            }
                        ],
                        lastnum: '000000',
                        thisdata: '2016-05-10',
                        setdata: '1513737093',
                        thisnum: '111',
                        readnum: '',
                        differentnum: '111111',
                        unitprice: '2',
                        bill: '1200',
                        create_start_date:'1480867200000',
                        pickerOptions: {
                            disabledDate:(time)=> {
                                return time.getTime() > Date.now() || time.getTime() < this.tableData[0].create_start_date;
                            }
                        },
                    },
                    {
                        address: '上海市普陀区金沙江路',
                        addressdet: '12栋2单元1202',
                        user: [{
                                value: '1',
                                label: '赵世浩',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                            {
                                value: '0',
                                label: '未分配',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                        ],
                        currentuser: '1',
                        userid: '110',
                        instrument: '仪表001',
                        instrumentid: '000000000021',
                        lastdateall: [{
                                value: '111111',
                                label: '2016-05-02'
                            },
                            {
                                value: '1sdf',
                                label: '2016-05-02'
                            },
                            {
                                value: 'asfd1',
                                label: '2016-05-02'
                            },
                            {
                                value: 'asdfaf1',
                                label: '2016-05-02'
                            }
                        ],
                        lastnum: '111111',
                        thisdata: '',
                        setdata: '1513737093',
                        thisnum: '',
                        readnum: '',
                        differentnum: '111111',
                        unitprice: '2',
                        bill: '1200',
                        pickerOptions: {
                            disabledDate:(time)=> {
                                return time.getTime() > Date.now() || time.getTime() < this.create_start_date;
                            }
                        },
                    },
                    {
                        address: '上海市普陀区金沙江路',
                        addressdet: '12栋2单元1202',
                        user: [{
                                value: '1',
                                label: '赵世浩',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                            {
                                value: '0',
                                label: '未分配',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                        ],
                        currentuser: '1',
                        userid: '110',
                        instrument: '仪表001',
                        instrumentid: '000000000021',
                        lastdateall: [{
                                value: '111111',
                                label: '2016-05-02'
                            },
                            {
                                value: '1asdfsdf',
                                label: '2016-05-02'
                            },
                            {
                                value: '1fknklkl',
                                label: '2016-05-02'
                            },
                            {
                                value: '1asdfk',
                                label: '2016-05-02'
                            }
                        ],
                        lastnum: '000000',
                        thisdata: '2016-05-10',
                        setdata: '2016/05/10',
                        thisnum: '111111',
                        readnum: '',
                        differentnum: '111111',
                        unitprice: '2',
                        bill: '1200',
                        create_start_date:'1480867200000',
                        // pickerOptions: {
                        //     disabledDate:(time)=> {
                        //         return time.getTime() > Date.now() || time.getTime() < this.tableData[2].create_start_date;
                        //     }
                        // },
                    }
                ]
            }
        },
        mounted () {
            this.tableData[2].pickerOptions =   {
                            disabledDate:(time)=> {
                                return time.getTime() > Date.now() || time.getTime() < this.tableData[2].create_start_date;
                            }
                        }
        },
        methods: {
            test(date) {
                console.log(date)
            },
            savech() {
                console.log(this.tableData)
            },
            handleCommand(command){
                console.log(command)
            },
        }
    }
</script>

<style lang="less" scoped>
.devicesuser{
        display: inline-block;
        width: 100%;
        i{
            float:right;
        }
    }
</style>
