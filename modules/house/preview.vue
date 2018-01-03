<template>
    <div class="preview">
        <h3 class="title">{{room.name}} {{room.area}} {{room.orientation}}</h3>
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
            <el-table :data="room.devices" stripe>
                <el-table-column prop="deviceId" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="title" label="设备">
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
        <div>
            <el-button @click.native="del" type="danger">删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
    	props: {
    		house: Object,
    		room: {
    			type: Object,
    			default() {
    				return {
    					houseType: {},
    					devcies: [{ part: '门锁', room: '1021', id: '12132013' }],
    					bills: [{ name: '租金', amount: '1400', period: '一月一付' }]
    				};
    			}
    		}
    	},
    	watch: {
    		room(val) {
    			console.log('change:', this.room, this.house);
    		}
    	},
    	created() {
    		// 获取房间数据
    		console.log('room:', this.room, this.house);
    	},
    	methods: {
    		del(room) {
    			this.$model('rooms').delete(null, {
    				id: this.roomId
    			});
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

