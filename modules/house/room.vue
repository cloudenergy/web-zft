<template>
    <div class="house-cell" :class="{out: out}">
        <h3>{{room.name}}</h3>
        <p>{{room.houseType.name}} </p>
        <p>{{room.houseType.area}} {{room.houseType.orientation}}</p>
        <p class="rentee">
            <span>￥ 200</span>
            <span>小清新</span>
        </p>
    </div>
</template>

<script>
    export default {
    	props: {
    		room: Object
    	},
    	data() {
    		return {
    			out: Math.random() > 0.5
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .house-cell {
    	padding: 10px;
    	width: 180px;
    	height: 116px;
    	border-radius: 4px;
    	border: 1px solid @light;
    	border-left: 4px solid @success;
    	cursor: pointer;

    	&.out {
    		border-left-color: @primary;
    	}

    	h3 {
    		margin-bottom: 10px;
    		overflow: hidden;
    		white-space: nowrap;
    	}

    	p {
    		margin-top: 10px;
    		color: @gray;
    		overflow: hidden;
    		white-space: nowrap;
    	}

    	.rentee {
    		border-top: 1px solid @light;
    		padding-top: 12px;
    		margin-top: 8px;

    		display: flex;
    		justify-content: space-between;
    	}
    }
</style>
