<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="房源" min-width="175">
                <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                    <br>
                    <span style="margin-top:5px">{{ scope.row.addressdet }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="仪表名称/ID" min-width="105">
                <template slot-scope="scope">
                    <span>{{ scope.row.instrument }}</span>
                    <br>
                    <span style="margin-top:5px">{{ scope.row.instrumentid }}</span>
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
             <el-table-column label="往次抄表" min-width="180">
                <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.setdata" type="date" placeholder="选择日期" style="width:160px"
                        @change="oldTime(scope.row)">
                    </el-date-picker><br/>
                    <span style="margin-left: 30px;margin-top:5px">{{ scope.row.lastnum }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="本次抄表" min-width="180">
                <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.setdata" type="date" placeholder="选择日期" style="width:160px"
                        @change="newTime(scope.row)">
                    </el-date-picker><br>
                    <span style="margin-left: 30px;margin-top:5px">{{ scope.row.thisnum }}</span>
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
                                value: '111111',
                                label: '2016-05-02'
                            },
                            {
                                value: '11111',
                                label: '2016-05-02'
                            },
                            {
                                value: '22222',
                                label: '2016-05-02'
                            },
                            {
                                value: '33333',
                                label: '2016-05-02'
                            }
                        ],
                        lastnum: '000000',
                        thisdata: '2016-05-10',
                        setdata: '1483200000',
                        thisnum: '111',
                        readnum: '',
                        differentnum: '',
                        unitprice: '2',
                        bill: ''
                    },
                    {
                        address: '上海市普陀区金沙江路',
                        addressdet: '12栋2单元1202',
                        user: [{
                                value: 'asdf',
                                label: '赵世浩',
                                from:'2017-01-01',
                                to:'2018-01-01'
                            },
                            {
                                value: 'asdfasdf',
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
                                value: 'asdfsadf',
                                label: '2016-05-02'
                            },
                            {
                                value: 'asdfasdf',
                                label: '2016-05-02'
                            },
                            {
                                value: 'asdfsadfasdf',
                                label: '2016-05-02'
                            }
                        ],
                        lastnum: '111111',
                        thisdata: '',
                        setdata: '1483200000',
                        thisnum: '1',
                        readnum: '',
                        differentnum: '',
                        unitprice: '2',
                        bill: ''
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
                                value: '333',
                                label: '2016-05-02'
                            },
                            {
                                value: '454',
                                label: '2016-05-02'
                            },
                            {
                                value: '44444',
                                label: '2016-05-02'
                            }
                        ],
                        lastnum: '000000',
                        thisdata: '2016-05-10',
                        setdata: '1483200000',
                        thisnum: '111111',
                        readnum: '',
                        differentnum: '',
                        unitprice: '2',
                        bill: ''
                    }
                ]
            }
        },
        mounted () {
              this.tableData.forEach(element => {
                  element.setdata = new Date(parseInt(element.setdata) * 1000).toLocaleDateString().replace(/\//g, "-")
                  element.differentnum=this.computations(element.thisnum,element.lastnum)
                  element.bill = this.computationsPrice(element.differentnum,element.unitprice)
              });
        },
        methods: {
            oldTime(data) {
                data.lastnum = 11111;
                data.differentnum=this.computations(data.thisnum,data.lastnum)
                data.bill = this.computationsPrice(data.differentnum,data.unitprice)
            },
            newTime(data){
                data.thisnum = 999999;
                data.differentnum=this.computations(data.thisnum,data.lastnum)
                data.bill = this.computationsPrice(data.differentnum,data.unitprice)
            },
            savech() {
                console.log(this.tableData)
            },
            handleCommand(command){
                console.log(command)
            },
            computations(newnum,oldnum){
                return newnum-oldnum;
            },
            computationsPrice(differentnum,price){
                return differentnum*price
            }
        }
    }
</script>

<style lang="less" scoped>
    input.choose{
        border:1px solid transparent;
    }
    .devicesuser{
        display: inline-block;
        width: 100%;
        i{
            float:right;
        }
    }
</style>
<style>
    .no-border>.el-input>.el-input__inner{
        border: 1px solid transparent;
        padding: 0;
        background-color: none;
    }
</style>

