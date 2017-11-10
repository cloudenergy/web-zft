<template>
    <div class="top-nav">
        <div class="links">
            <el-menu class="el-menu-status" mode="horizontal" default-active="progressing" @select="handleSelect">
                <el-menu-item index="progressing">未完成</el-menu-item>
                <el-menu-item index="finished">已完成</el-menu-item>
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
