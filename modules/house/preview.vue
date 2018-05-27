<template>
    <div class="preview">
        <div class="backgroundGray">
            <div class="previewRoom">
                <h3 class="title" v-if="room.name!==''">{{house.location.name}}{{house.building}}幢{{house.unit}}单元{{house.roomNumber}} {{room.name}}</h3>
                <h3 class="title" v-if="room.name===''">{{house.location.name}} {{house.roomNumber}}{{room.orientation}}</h3>
                <div>
                    <div class="base section">
                        <h4>房间信息</h4>
                        <p>朝向:
                            <span v-for="(item,index) in this.$store.state.userInfo.toward" :key="index" v-if="item.EN===house.layout.orientation">{{item.CH}}</span>
                        </p>
                    </div>
                    <div class="facilities section">
                        <h4>房间配置</h4>
                        <house-facility></house-facility>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div class="devices section previewRoom">
            <h4 class="flexc" style="aline-item:center">
                <span style="line-height:20px;margin-right:15px">
                    智能设备
                </span>
                <i class="el-icon-circle-plus-outline" style="font-size:20px;color:#409eff" @click="bindEleciricity"></i>
            </h4>
            <el-table :data="room.devices" stripe class="section">
                <el-table-column prop="deviceId" label="设备ID" width="110">
                    <template slot-scope="scope">
                        <span>{{delDeviceYTL(scope.row.deviceId)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="memo" label="设备备注" min-width="120">
                </el-table-column>
                <el-table-column prop="deviceId" label="读数">
                    <template slot-scope="scope">
                        <span>{{scope.row.scale}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" label="通讯时间" width="80">
                    <template slot-scope="scope">
                        <span>{{date(scope.row.updatedAt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="通讯状态" width="70">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status.service==='EMC_ONLINE'">正常</span>
                        <span v-if="scope.row.status.service==='EMC_OFFLINE'">异常</span>
                    </template>
                </el-table-column>
                <el-table-column label="控制" width="60">
                    <template slot-scope="scope">
                        <el-switch :width="num" v-model="scope.row.status.switch" active-color="#13ce66" inactive-color="#ff4949" @change="eleciricitySwitch"
                            active-value="EMC_ON" inactive-value="EMC_OFF">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="管理" width="70">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="bills section">
            <h4>租费详情</h4>
            <el-table :data="contracts" stripe>
                <el-table-column prop="name" label="租金" width="150">
                    <template slot-scope="scope">
                        <span>{{price(scope.row.rent)}}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="押金">
                    <template slot-scope="scope">
                        <span v-if="scope.row.bond">{{price(scope.row.bond)}}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="电费">
                    <template slot-scope="scope">
                        <span>{{price(scope.row.price)}}元/度</span>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="方式">
                    <template slot-scope="scope">
                        <span>{{scope.row.freq}}月一付</span>
                    </template>
                </el-table-column>
                <el-table-column prop="period" label="租期" min-width="120">
                    <template slot-scope="scope">
                        <span>{{date(scope.row.from)}}至{{date(scope.row.to)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button @click.native="del" type="danger">删除房间</el-button>
        </div>
        </div>
        
        <el-dialog title="选择要绑定的智能设备" :visible.sync="dialogVisible" width="40%" append-to-body>
            <conversion ref="aaa" @setEquipmentid="setEquipmentid" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choosechange()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { delYTL } from '~/utils/helper';
import conversion from '../devices/conversion.vue';
export default {
	props: {
		house: Object,
		room: {
			type: Object,
			default() {
				return {
					houseType: {},
					devcies: [
						{
							part: '门锁',
							room: '1021',
							id: '12132013'
						}
					],
					bills: [
						{
							name: '租金',
							amount: '1400',
							period: '一月一付'
						}
					]
				};
			}
		}
	},
	data() {
		return {
			dialogVisible: false,
			value4: true,
			reqData: {
				roomId: this.room.id
			},
			num: 30
		};
	},
	components: {
		conversion
	},
	created() {
		if (this.room.contract.from !== undefined) {
			console.log(this.house);
			this.contracts[0].rent = this.room.contract.rent;
			this.contracts[0].to = this.room.contract.to;
			this.contracts[0].from = this.room.contract.from;
			this.contracts[0].price =
				this.house.prices.length !== 0 ? this.house.prices[0].price : 0;
			this.$model('contracts_info')
				.query(
					{},
					{
						projectId: this.projectId,
						contractId: this.room.contract.id
					}
				)
				.then(res => {
					console.log(res);
					this.contracts[0].price = res.expenses[0].rent;
					this.contracts[0].bond = res.strategy.bond;
					this.contracts[0].freq = res.strategy.freq.pattern;
				})
				.catch(err => {});
		}
	},
	computed: {
		projectId() {
			return this.$store.state.userInfo.user.projectId;
		},
		contracts() {
			return this.room.contract.from ? [{ bond: '-', freq: '1' }] : [];
		}
	},
	methods: {
		date(val) {
			return format(new Date(val * 1000), 'YYYY-MM-DD');
		},
		delDeviceYTL(val) {
			return delYTL(val);
		},
		electricSwitch(data) {
			return data.status.switch === 'EMC_ON';
		},
		eleciricitySwitch(data) {
			if (data) {
				this.reqData.mode = 'EMC_ON';
			} else {
				this.reqData.mode = 'EMC_OFF';
			}
			this.$model('electricity_instructions')
				.patch(this.reqData, {
					projectId: this.projectId,
					id: 'switch'
				})
				.then(res => {
					this.$message.success('成功');
				});
		},
		del(room) {
			this.$model('rooms').delete(null, {
				id: this.roomId
			});
		},
		// 解绑设备
		handleDelete(data) {
			this.$confirm('此操作将解绑此电表, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$model('room_devices')
						.delete(
							{},
							{
								projectId: this.projectId,
								houseId: this.house.houseId,
								roomId: this.room.id,
								id: data.deviceId
							}
						)
						.then(res => {
							this.queryAgain('unbundling');
						});
				})
				.catch(err => {
					this.$message('取消解绑');
				});
		},
		bindEleciricity() {
			this.dialogVisible = true;
		},
		// 添加设备
		setEquipmentid(data) {
			this.$model('room_devices')
				.update(
					{},
					{
						projectId: this.projectId,
						houseId: this.house.houseId,
						roomId: this.room.id,
						id: data
					}
				)
				.then(data => {
					this.$refs.aaa.setNewList();
					this.queryAgain('bind');
				})
				.catch(err => {
					this.$message.mistake('绑定失败');
				});
		},
		choosechange() {
			this.chooseElectricity();
		},
		chooseElectricity() {
			this.$confirm('此操作将选择此电表, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$refs.aaa.changeelectricity(this.houseId);
					this.dialogVisible = false;
					this.$refs.aaa.log();
				})
				.catch(err => {});
		},
		// 请求房间信息
		queryAgain(data) {
			this.$model('room_detail')
				.query(
					{},
					{
						projectId: this.projectId,
						houseId: this.house.houseId,
						roomId: this.room.id
					}
				)
				.then(res => {
					this.$message.success('操作成功');
					if (res.devices.length !== 0) {
						this.$set(this.room, 'devices', res.devices);
					} else {
						this.$set(this.room, 'devices', []);
					}
				});
		},
		date(data) {
			return new Date(parseInt(data) * 1000)
				.toLocaleDateString()
				.replace(/\//g, '-');
		},
		price(data) {
			return (data / 100).toFixed(2);
		}
	}
};
</script>

<style lang="less" scoped>
.backgroundGray {
	background-color: #f5f7fa;
}
.previewRoom {
	padding: 30px;
}
.base {
	margin-top: 20px;
}

.section {
	margin-bottom: 30px;

	h4 {
		margin-bottom: 20px;
	}
}
</style>
<style>
.el-switch {
	height: 22px;
}
</style>