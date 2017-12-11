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
            <el-table :data="room.devcies" stripe>
                <el-table-column prop="id" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="part" label="设备">
                </el-table-column>
                <el-table-column prop="room" label="房间">
                </el-table-column>
            </el-table>
        </div>
        <div class="bills section">
            <h4>租费设置</h4>
            <el-table :data="room.bills" stripe>
                <el-table-column prop="name" label="名称" width="150">
                </el-table-column>
                <el-table-column prop="amount" label="金额">
                </el-table-column>
                <el-table-column prop="period" label="周期">
                </el-table-column>
            </el-table>
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
    					devcies: [{ part: '门锁', ro0m: '1021', id: '12132013' }],
    					bills: [{ name: '租金', amount: '1400', period: '一月一付' }]
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

