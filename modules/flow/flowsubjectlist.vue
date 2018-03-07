<template lang="html">
<div class="subjectHouseLocation">
    <el-table :data="subjectFlows" :row-key="getRowKeys" :expand-row-keys="expands"         @row-click='handleRowHandle'         ref="tableData">
        <el-table-column type="expand">
            <template slot-scope="props">
                <div class="housesInLocation">
                    <div v-for="item in props.row.housesInLocation" class="flexc">
                        <div><span v-if="item.location">{{item.location.location.name}}{{item.location.building}}幢{{item.location.unit}}单元{{item.location.roomNumber}}</span></div>
                        <div><span>{{price(item.rent)}}</span></div>
                        <div><span>{{price(item.rentFee)}}</span></div>
                        <div><span>{{price(item.topup)}}</span></div>
                        <div><span>{{price(item.topupFee)}}</span></div>
                        <div><span>{{price(item.finalReceive)}}</span></div>
                        <div><span>{{price(item.finalPay)}}</span></div>
                        <div><span>{{price(item.balance)}}</span></div>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="小区/房源" prop="name">
        </el-table-column>
        <el-table-column label="租约收入" prop="rent">
            <template slot-scope="props">
                <span>{{price(props.row.rent)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="服务费" prop="username">
            <template slot-scope="props">
                <span>{{price(props.row.rentFee)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="预付费收入" prop="waym">
            <template slot-scope="props">
                <span>{{price(props.row.topup)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="服务费" prop="payway">
           <template slot-scope="props">
                <span>{{price(props.row.topupFee)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="退租收入" prop="remark">
            <template slot-scope="props">
                <span>{{price(props.row.finalReceive)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="退租支出" prop="remark">
            <template slot-scope="props">
                <span>{{price(props.row.finalPay)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="结余" prop="topupFee">
            <template slot-scope="props">
                <span>{{price(props.row.balance)}}</span>
            </template>
        </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total='flowPaging.count' @current-change="handleCurrentChange" style="margin-top:5px;text-align:right"
            :page-size='20'>
        </el-pagination> -->
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        props:{
            subjectFlows:{
                required:true
            },
            reqData: {
                required:true
            },
            loading: {
                type:Array
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
                test:true,
                copyLoading:[]
            }
        },
        
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId
            }
        },
        mounted() {
            // 在这里你想初始化的时候展开哪一行都可以了
            // this.$refs.tableData.toggleRowExpansion(this.tableData[0]) // 選中第二個
                     // 選中 value = 1 那行
            // this.$refs.tableData.toggleRowExpansion(this.tableData.find(d => d.id == 888886))
        },
        methods: {
            handleRowHandle(row,event,column) {    
                let index = _.indexOf(this.subjectFlows,row)
                let houseQuery = this.reqData
                houseQuery.housesInLocation = row.id
                // TODO SUOQIN community SEARCH 
                this.$model('flow_month')
					.query(houseQuery, {
						projectId: this.projectId
					})
					.then(res => {
						this.subjectFlows[index].housesInLocation = res
						res.forEach((ele, num) => {
							this.$model('housedetail')
								.query({houseFormat: 'SHARE'}, {
									projectId: this.projectId,
									id: ele.id
								})
								.then(data => {
                                    
									this.subjectFlows[index].housesInLocation[num].location = data
                                    if(num===0) {
                                        if (row.id !== this.upflowi ) {
                                            this.toggle(row.id)
                                            if (this.upflowi !== 0) {
                                                this.toggle(this.upflowi)
                                                this.upflowi = row.id
                                            }
                                        } else {
                                            this.toggle(row.id)
                                        }
                                    }
								})
								.catch(err => {
									console.log(err)
								})
						})
					})
					.catch(err => {
						console.log(err)
					});
            },
            toggle(flowi) {
                this.$refs.tableData.toggleRowExpansion(this.subjectFlows.find(d => d.id == flowi))
            },
            price(data) {
                return (data / 100).toFixed(2)
            }
        }
    }
</script>

<style lang="less">
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
    .subjectHouseLocation .el-table__expanded-cell {
        padding:20px 0 20px 52px;
        color:#999;
    }
</style>

<style lang="less" scoped>
    .housesInLocation>div>div{
        flex:1;
        padding:0 10px;
        span{
            flex:1;
        }
    }
</style>

