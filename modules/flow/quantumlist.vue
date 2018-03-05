<template lang="html">
    <div>
        <!-- TODO ZHOUYI 服务费返回 -->
        <el-table :data="mounthFlows" :row-key="getRowKeys" :expand-row-keys="expands"     @row-click='handleRowHandle'         ref="tableData5"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-row>
                        <el-col v-if="props.row.billItems!==null" :span="5">
                            <p v-for="item in props.row.billItems" class="flexcenter">
                                <span v-for="(list,index) in otherCost" :key="index" v-if="list.id===item.configId">{{list.key}}</span>
                                <span v-if="item.configId===121">租金</span>
                                <span v-if="item.configId===123">押金</span>
                                <span>
                                    {{price(item.amount)}}
                                </span>
                            </p>
                        </el-col>
                        <el-col v-if="props.row.category==='topup'" :span="5">
                            <p class="flexcenter">
                                <span>充值</span>
                                <span>
                                    {{price(props.row.amount)}}
                                </span>
                            </p>
                        </el-col>
                        <el-col v-if="props.row.category==='final'" :span="5">
                            <p class="flexcenter">
                                <span>退租</span>
                                <span>
                                    {{price(props.row.amount)}}
                                </span>
                            </p>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="支付时间">
                <template slot-scope="scope">
                    <span>{{ timeChange(scope.row.paidAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="金额" prop="folwm" width="80px">
                <template slot-scope="scope">
                    <div :style="{color:scope.row.direction==='pay'?'#fd6d6d':'#67c23a'}">
                        <span v-if="scope.row.direction==='pay'">-</span>
                        <span>{{ price(scope.row.amount) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="姓名" prop="user.name" min-width="100">
            </el-table-column>
            <el-table-column label="房源" prop="houseresource" min-width="180" max-width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.room.locationName}}{{scope.row.room.building}}幢{{scope.row.room.unit}}单元{{scope.row.room.roomNumber}} {{scope.row.room.roomName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="费用类型" prop="category">
                <template slot-scope="scope">
                    <span v-for="(item, index) in costType" :key="index" v-if="item.type===scope.row.category">{{item.value}}</span>
                </template>
            </el-table-column>
            <el-table-column label="支付方式" prop="fundChannelId">
                <template slot-scope="scope">
                    <span v-for="(item, index) in fundChannel" :key="index" v-if="item.id===scope.row.fundChannelId">{{item.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="handlem">
                <template slot-scope="scope">
                    <span>{{scope.row.operator.username}}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark">
                <template slot-scope="scope">
                    <span v-if="scope.row.remake!==undefined">{{scope.row.remake}}</span>
                    <span v-if="scope.row.remake===undefined">-</span>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination background layout="prev, pager, next" :total='flowPaging.count' @current-change="handleCurrentChange" style="margin-top:5px;text-align:right"
            :page-size='20'>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            flowPaging: {
                required: true
            },
            mounthFlows: {
                type: Array
            }
        },
        created() {
            this.getFundChannel()
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId
            },
            costType() {
                return [
                    {type:'rent',value:'租金'},
                    {type:'topup',value:'充值'},
                    {type:'final',value:'退租'}
                ]
            }
        },
        data() {
            return {
                upflowi: 0,
                // 获取row的key值
                getRowKeys(row) {
                    return row.id;
                },
                // 要展开的行，数值的元素是row的key值
                expands: [],
                fundChannel: [],
                otherCost: [],
                item: {}
            }
        },
        mounted() {
            // 在这里你想初始化的时候展开哪一行都可以了
            // this.$refs.tableData5.toggleRowExpansion(this.tableData5[0]) // 選中第二個
                     // 選中 value = 1 那行
            // this.$refs.tableData5.toggleRowExpansion(this.tableData5.find(d => d.id == 2017-01-01 17:056))
        },
        methods: {
            handleRowHandle(row) {
                if (row.id != this.upflowi) {
                    this.toggle(row.id)
                    if (this.upflowi != 0) {
                        this.toggle(this.upflowi)
                        this.upflowi = row.id
                    }
                } else {
                    this.toggle(row.id)
                }

                        
            },
            toggle(flowi) {
                this.$refs.tableData5.toggleRowExpansion(this.mounthFlows.find(d => d.id == flowi))
            },
            timeChange(data) {
                return new Date(parseInt(data * 1000)).toLocaleDateString()
            },
            price(data) {
                return (data / 100).toFixed(2)
            },
            handleCurrentChange(val) {
                this.$emit('pageIndex', val)
            },
            getFundChannel() {
                this.$model('fund_channel')
                    .query({
                        category: 'all',
                        flow: 'receive'
                    }, {
                        projectId: this.projectId
                    })
                    .then(res => this.$set(this, 'fundChannel', res))
                this.$store
                    .dispatch('GET_OTHERCOST')
                    .then(data => (this.otherCost = data));
            }
        }
    }
</script>

<style lang="css">
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .billItems {
        display: flex;
        justify-content: space-around
    }
</style>