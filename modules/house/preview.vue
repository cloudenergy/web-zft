<template>
    <div class="preview">
        <h3 class="title">{{room.houseType.name}} {{room.houseType.area}} {{room.houseType.orientation}}</h3>
        <div class="base section">
            <h4>房间信息</h4>
            <p>房间: 次卧 18平 东</p>
        </div>
        <div class="facilities section">
            <h4>房间配置</h4>
            <house-facility></house-facility>
        </div>
        <div class="devices section">
            <h4>智能设备</h4>
            <div class="list">
                <p v-for="device in room.devcies">【门锁】 {{device}} 1021室</p>
            </div>
        </div>
        <div class="bills section">
            <h4>租费设置</h4>
            <div class="list">
                <p v-for="bill in room.bills">
                    <span>{{bill}}: </span>
                    <span>1500/月 </span>
                    <span>一月一付</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    	props: {
    		room: {
    			type: Object,
    			default() {
    				return {
    					houseType: {},
    					devcies: [100121, 121231],
    					bills: ['租金', '水费', '电费']
    				};
    			}
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .section {
    	margin-bottom: 30px;

    	h4 {
    		margin-bottom: 20px;
    	}
    }
</style>

