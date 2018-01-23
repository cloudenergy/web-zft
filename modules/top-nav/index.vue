<template>
    <div class="top-nav">
        <div class="top-nav-content">
            <el-menu class="el-menu-demo" mode="horizontal" :router="true" :default-active="$route.path">
                <el-menu-item :index="link.url" v-for="link in links" :key="link.url">{{link.text}}</el-menu-item>
            </el-menu>
        </div>
        <slot />
    </div>
</template> 
<script>
export default {
	props: {
		links: Array
	}
};
</script>

<style lang="less" scoped>
.top-nav {
	position: relative;
	z-index: 3;
	display: flex;
	flex-direction: row;
	align-content: stretch;
	align-items: stretch;
	// justify-content: space-between;
	height: 60px;
	color: #fff;
}

.ceiling-main {
	float: right;
	margin-right: 15px;

	a {
		color: #9ba7b5;
		margin: 0 10px;
	}
}
</style>
