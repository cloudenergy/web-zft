<template lang="html">
    <el-table
        :data="tableData5"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @row-click='handleRowHandle'
        ref="tableData5"
        style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
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
            </template>
        </el-table-column>
        <el-table-column
            label="小区/房源"
            prop="datetime">
        </el-table-column>
        <el-table-column
            label="押金收入"
            prop="folwm">
        </el-table-column>
        <el-table-column
            label="押金支出"
            prop="username">
        </el-table-column>
        <el-table-column
            label="押金结余"
            prop="houseresource">
        </el-table-column>
        <el-table-column
            label="租金收入"
            prop="waym">
        </el-table-column>
        <el-table-column
            label="租金支出"
            prop="payway">
        </el-table-column>
        <el-table-column
            label="租金结余"
            prop="handlem">
        </el-table-column>
        <el-table-column
            label="预付费收入"
            prop="remark">
        </el-table-column>
        <el-table-column
            label="预付费支出"
            prop="remark">
        </el-table-column>
        <el-table-column
            label="预付费结余"
            prop="remark">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            upflowi:0,
            tableData5: [{
                id: 11110,
                datetime: '88888',
                folwm: '￥1000',
                category: '88888',
                username: '99999',
                address: '00000',
                shop: '11111',
                shopId: '10333',
                houseresource: '22222',
                payway: '支付宝',
                waym: '缴费',
                handlem: '老王',
                remark: '3年没有缴费了'
            }, {
                id: 11111,
                datetime: '88888',
                folwm: '￥1000',
                category: '88888',
                username: '99999',
                address: '00000',
                shop: '11111',
                shopId: '10333',
                houseresource: '22222',
                payway: '微信',
                waym: '缴费',
                handlem: '',
                remark: '3年没有缴费了'
            }, {
                id: 11112,
                datetime: '88888',
                folwm: '￥1000',
                category: '88888',
                username: '99999',
                address: '00000',
                shop: '11111',
                shopId: '10333',
                houseresource: '22222',
                payway: '现金',
                waym: '结余',
                handlem: '老王',
                remark: '3年没有缴费了'
            }, {
                id: 11113,
                datetime: '88888',
                folwm: '￥1000',
                category: '88888',
                username: '99999',
                address: '00000',
                shop: '11111',
                shopId: '10333',
                houseresource: '22222',
                payway: '银行卡',
                waym: '缴费',
                handlem: '老王',
                remark: '3年没有缴费了'
            }],
            
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
    methods:{
        handleRowHandle(row){
                console.log(row.id)
                if(row.id!=this.upflowi){
                    this.toggle(row.id)
                    if (this.upflowi!=0){
                        this.toggle(this.upflowi)
                        this.upflowi=row.id
                    }
                    
                    console.log(this.upflowi)
                }else{
                    this.toggle(row.id)
                }
                
        },
        toggle(flowi){
            this.$refs.tableData5.toggleRowExpansion(this.tableData5.find(d => d.id == flowi)) 
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