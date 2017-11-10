<template>
    <div class="top-nav">
        <div class="links">
            <el-menu class="el-menu-status" mode="horizontal" default-active="all" @select="handleSelect">
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="receive">收款</el-menu-item>
                <el-menu-item index="pay">付款</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
