<template>
    <div class="house-cell">
        <h3>B</h3>
        <p>￥ 200</p>
        <p>主卧 13平 西</p>
        <p class="rentee">
            <span>小清新</span>
            <span>2017-10-10</span>
        </p>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
    .house-cell {
    	padding: 15px;
    	width: 180px;
    	height: 100px;
    	border-radius: 4px;
    	border: 1px solid @light;
    	border-left: 4px solid @primary;

    	h3 {
    		margin-bottom: 10px;
    	}

    	p {
    		margin-bottom: 4px;
    		color: @gray;
    	}

    	.rentee {
    		border-top: 1px solid @light;
    		padding-top: 5px;
    		margin-top: 8px;

    		display: flex;
    		justify-content: space-between;
    	}
    }
</style>
