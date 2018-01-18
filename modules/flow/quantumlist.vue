<template lang="html">
    <el-table
        :data="mounthFlows"
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
            label="支付时间">
            <template slot-scope="scope">
                <span>{{ timeChange(scope.row.paidAt) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="金额"
            prop="folwm"
            width="80px">
            <template slot-scope="scope">
                <span>{{ price(scope.row.amount) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="姓名"
            prop="user.name"
            min-width="100">
        </el-table-column>
        <el-table-column
            label="房源"
            prop="houseresource"
            min-width="180"
            max-width="200">
            <template slot-scope="scope">
                <span>{{scope.row.room.locationName}}{{scope.row.room.building}}{{scope.row.room.unit}}{{scope.row.room.roomNumber}}{{scope.row.room.roomName}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="费用类型"
            prop="category">
        </el-table-column>
        <el-table-column
            label="支付方式"
            prop="paymentChannel">
        </el-table-column>
        <el-table-column
            label="操作人"
            prop="handlem">
        </el-table-column>
        <el-table-column
            label="备注"
            prop="remark">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:{
        flowPaging:{
            required:true
        },
        mounthFlows:{
            type:Array
        }
    },
    data() {
        return {
            upflowi:0,
            tableData5: [{
                id: 11110,
                datetime: '2017-01-01 17:05',
                folwm: '￥1000',
                category: '江浙小吃、小吃零食',
                username: '11011912011 username',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                houseresource: '西湖区文一西路·5D 1栋A101',
                payway: '支付宝',
                waym: '缴费',
                handlem: '老王',
                remark: '3年没有缴费了'
            }, {
                id: 11111,
                datetime: '2017-01-01 17:05',
                folwm: '￥1000',
                category: '江浙小吃、小吃零食',
                username: '11011912011 username',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                houseresource: '西湖区文一西路·5D 1栋A101',
                payway: '微信',
                waym: '缴费',
                handlem: '',
                remark: '3年没有缴费了'
            }, {
                id: 11112,
                datetime: '2017-01-01 17:05',
                folwm: '￥1000',
                category: '江浙小吃、小吃零食',
                username: '11011912011 username',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                houseresource: '西湖区文一西路·5D 1栋A101撒地方士大夫士大夫撒旦法第三方',
                payway: '现金',
                waym: '结余',
                handlem: '老王',
                remark: '3年没有缴费了'
            }, {
                id: 11113,
                datetime: '2017-01-01 17:05',
                folwm: '￥1000',
                category: '江浙小吃、小吃零食',
                username: '11011912011 username',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                houseresource: '西湖区文一西路·5D 1栋A101',
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
        // this.$refs.tableData5.toggleRowExpansion(this.tableData5.find(d => d.id == 2017-01-01 17:056))
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
        },
        timeChange(data){
            return new Date(parseInt(data)).toLocaleDateString()
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
