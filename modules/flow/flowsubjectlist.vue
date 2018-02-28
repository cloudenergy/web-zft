<template lang="html">
    <el-table :data="subjectFlows" :row-key="getRowKeys" :expand-row-keys="expands"         @row-click='handleRowHandle'         ref="tableData5">
        <el-table-column type="expand">
            <!-- <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                        <span>{{ props.row.folwm }}</span>
                    </el-form-item>
                    <el-form-item label="所属店铺">
                        <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                        <span>{{ props.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <span>{{ props.row.username }}</span>
                    </el-form-item>
                </el-form>
            </template> -->
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
        <el-table-column label="退租结算" prop="remark">
            <template slot-scope="props">
                <span>{{price(props.row.rent)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="结余" prop="topupFee">
            <template slot-scope="props">
                <span>{{price(props.row.final)}}</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props:{
            subjectFlows:{
                required:true
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
                expands: []
            }
        },
        mounted() {
            // 在这里你想初始化的时候展开哪一行都可以了
            // this.$refs.tableData5.toggleRowExpansion(this.tableData5[0]) // 選中第二個
                     // 選中 value = 1 那行
            // this.$refs.tableData5.toggleRowExpansion(this.tableData5.find(d => d.id == 888886))
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
                this.$refs.tableData5.toggleRowExpansion(this.tableData5.find(d => d.id == flowi))
            },
            price(data) {
                return data/100
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
</style>