<template>
    <div class="nav">
        <el-menu :default-active="$route.path" class="el-menu-vertical" :collapse="false" :router="true">
            <el-menu-item index="/houses">
                <i class="el-icon-location"></i>
                <span slot="title">房源</span>
            </el-menu-item>
            <el-menu-item index="/rent">
                <i class="el-icon-menu"></i>
                <span slot="title">租务</span>
            </el-menu-item>
            <el-menu-item index="/bills">
                <i class="el-icon-document"></i>
                <span slot="title">账单</span>
            </el-menu-item>
            <el-menu-item index="/flow">
                <i class="el-icon-tickets"></i>
                <span slot="title">流水</span>
            </el-menu-item>
            <el-menu-item index="/reports">
                <i class="el-icon-picture"></i>
                <span slot="title">报表</span>
            </el-menu-item>
            <el-menu-item index="/devices">
                <i class="el-icon-printer"></i>
                <span slot="title">抄表</span>
            </el-menu-item>
            <el-menu-item index="/settings">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
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
