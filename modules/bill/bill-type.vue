<template>
    <div>
        <el-button plain disabled>类型</el-button>
        <el-select v-model="billType" filterable placeholder="Select" class="select">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [{
                value: 'all',
                label: '全部'
            }, {
                value: 'prepaid',
                label: '租约'
            }, {
                value: 'postpaid',
                label: '记账'
            }],
            billType: 'all'
        }
    }
}
</script>

<style lang="less" scoped>
    .select {
        width: 50%;
    }
</style>
