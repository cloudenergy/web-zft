<template>
    <div class="unitPrice">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkList">
            <el-row>
                <el-col :span="8" v-for="(item,index) in data" :key="index" :class="{rightBorder:(index+1)%3!==0}" class="copyExtra">
                    <div class="">
                        <el-checkbox :label="item.houseId" text-color="#000000">{{item.location.name}}{{item.unit}}{{item.roomNumber}}</el-checkbox>
                    </div>
                </el-col>
            </el-row>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="costCopy(checkList)">确 定</el-button>
            <el-button @click="costCopy()">取 消</el-button>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                required: true
            }
        },
        computed: {
            houseOption() {
                return this.data.map(ele=>{
                    return ele.houseId
                })
            }  
        },
        data() {
            return {
                selectAttribute: null,
                checkList: [],
                isIndeterminate:false,
                checkAll:false,
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkList = val ? this.houseOption : []
            },
            costCopy(data) {
                this.$emit('refresh',data)
            }
        }
    }
</script>

<style lang="less" scoped>
    .copyExtra{
        height: 40px;
        display: flex;
        align-items: center;
    }
    .dialog-footer{
        float: right;
    }
</style>
<style>
    .unitPrice .el-checkbox__input.is-checked+.el-checkbox__label{
        color:#333
    }
</style>
