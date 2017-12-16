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
            <el-table-column label="归属账单" min-width="120">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.currentuser" placeholder="请选择">
                        <el-option v-for="item in scope.row.user" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <span>{{ scope.row.userid }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="往次抄表" min-width="140">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.lastnum" placeholder="请选择" popper-class="fsadfas">
                        <el-option v-for="item in scope.row.lastdateall" :key="item.value" :label="item.label" :value="item.value" width="180">
                            <span style="float: left">{{ item.label }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                    <br>
                    <span style="margin-left: 16px">{{ scope.row.lastnum }}</span>
                    <br>
                </template>
            </el-table-column>
            <el-table-column label="本次抄表" min-width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.thisdata }}</span>
                    <el-date-picker v-model="scope.row.setdata" type="date" placeholder="选择日期" v-if="scope.row.thisdata==''" style="width:130px"
                        @change="test">
                    </el-date-picker><br>
                    <span style="opacity:0">1</span>
                </template>
            </el-table-column>
            <el-table-column label="仪表读数">
                <template slot-scope="scope">
                    <span>{{ scope.row.thisnum }}</span>
                    <el-input v-model="scope.row.readnum" v-if="scope.row.thisnum==''"></el-input>
                    <span style="opacity:0">1</span>
                </template>
            </el-table-column>
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
                                value: 'asdf',
                                label: '赵世浩'
                            },
                            {
                                value: 'asdfsadf',
                                label: '未分配'
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
                        setdata: '',
                        thisnum: '111',
                        readnum: '',
                        differentnum: '111111',
                        unitprice: '2',
                        bill: '1200'
                    },
                    {
                        address: '上海市普陀区金沙江路',
                        addressdet: '12栋2单元1202',
                        user: [{
                                value: '1234324',
                                label: '赵世浩'
                            },
                            {
                                value: '0234234',
                                label: '未分配'
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
                        setdata: '',
                        thisnum: '',
                        readnum: '',
                        differentnum: '111111',
                        unitprice: '2',
                        bill: '1200'
                    },
                    {
                        address: '上海市普陀区金沙江路',
                        addressdet: '12栋2单元1202',
                        user: [{
                                value: '1sadfasf',
                                label: '赵世浩'
                            },
                            {
                                value: '0asdfsaf',
                                label: '未分配'
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
                        setdata: '',
                        thisnum: '111111',
                        readnum: '',
                        differentnum: '111111',
                        unitprice: '2',
                        bill: '1200'
                    }
                ]
            }
        },
        methods: {
            test(date) {
                console.log(date)
            },
            savech() {
                console.log(this.tableData)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
