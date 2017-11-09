<template>
	<div class="nav-wrapper ceiling">
		<div class="ceiling-main">
				<a href="#">Admin</a> |
				<a href="#">注销</a>
		</div>
	</div>
</template>
<script>
	export default {
	  name: "nav"
	};
</script>

<style lang="less" scoped>
	.nav-wrapper {
	  color: #fff;
	  background-color: @dark;
	}

	.ceiling {
	  background: #464c5b;
	  padding: 10px 0;
	  overflow: hidden;
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
