<template>
    <div class="house-cell">
        <h3>{{room.name}}</h3>
        <p class="info">￥ 200</p>
        <p>{{room.housetype.name}} {{room.housetype.area}} {{room.housetype.orientation}}</p>
        <p class="rentee">
            <span>小清新</span>
            <span>2017-10-10</span>
        </p>
    </div>
</template>

<script>
    export default {
    	props: {
    		room: Object
    	}
    };
</script>

<style lang="less" scoped>
    .house-cell {
    	padding: 10px;
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
    		overflow: hidden;
    		white-space: nowrap;
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
