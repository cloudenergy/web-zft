<template>
	<div class="top-nav">
		<div class="logo"></div>
		<div class="links">
			<el-menu class="el-menu-demo" mode="horizontal" >
				<el-menu-item index="1" v-for="link in links" :key="link.url">{{link.text}}</el-menu-item>
			</el-menu>
		</div>
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
	.logo {
	  height: 100%;
	  width: 100px;
	  float: left;
	}

	.top-nav {
	  color: #fff;
	  height: 60px;
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
