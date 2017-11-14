<template>
    <div>
        <el-button plain disabled>管理</el-button>
        <el-select v-model="manager" filterable placeholder="Select" class="select">
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
                value: 'laojiang',
                label: '老蒋'
            }, {
                value: 'laowang',
                label: '老王'
            }, {
                value: 'laozhang',
                label: '老张'
            }],
            manager: 'laojiang'
        }
    }
}
</script>

<style lang="less" scoped>
    .select {
        width: 50%;
    }
</style>
