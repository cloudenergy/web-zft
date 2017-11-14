<template>
    <div class="nav">
        <el-menu default-active="1-4-1" class="el-menu-vertical" :collapse="false" :router="true">
            <el-menu-item index="/houses">
                <i class="el-icon-location"></i>
                <span slot="title">房源</span>
            </el-menu-item>
            <el-menu-item index="/rent">
                <i class="el-icon-menu"></i>
                <span slot="title">租务</span>
            </el-menu-item>
            <el-menu-item index="/bills">
                <i class="el-icon-setting"></i>
                <span slot="title">账单</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="less" scoped>
    .el-menu-vertical {
        height: 100%;
        border-right: 0;
        background-color: #2f3c4d;
    }
    .el-menu-item {
        color: #eee;
        &:focus,
        &:hover,
        &.is-active {
            background-color: #212a38;
        }
    }

    .nav {
        height: 100%;
    }
</style>
