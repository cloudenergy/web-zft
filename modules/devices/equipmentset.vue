<template>
	<div>
		<el-table :data="devices" style="width: 100%" @row-click='handleRowHandle' @select="select" @select-all="selectAll" v-loading="equipmentLoading">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" :index="indexMethod" label="序号">
			</el-table-column>
			<el-table-column label="设备id" width="130" prop="deviceId">
				<template slot-scope="scope">
					<div @click="houseDevicesDosage(scope.row.deviceId)" class="cursorp">
						{{delYTL(scope.row.deviceId)}}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope" @click="houseDevicesDosage(scope.row.deviceId)" class="cursorp">
					<div v-if="scope.row.status.service==='EMC_ONLINE'" style="color:#13ce66">正常</div>
					<div v-if="scope.row.status.service==='EMC_OFFLINE'" style="color:#ff4949">异常</div>
				</template>
			</el-table-column>
			<el-table-column label="读数(KWH)" prop="scale">
				<template slot-scope="scope">
					<div @click="houseDevicesDosage(scope.row.deviceId)" class="cursorp">{{fixed(scope.row.scale)}}</div>
				</template>
			</el-table-column>
			<el-table-column label="通信时间">
				<template slot-scope="scope">
					<div @click="houseDevicesDosage(scope.row.deviceId)" class="cursorp">{{dateTime(scope.row.updatedAt*1000)}}</div>
				</template>
			</el-table-column>
			<el-table-column label="关联房源" v-if="loading===1">
				<template slot-scope="scope">
					<div class="flexcenter cursorp" style="padding-right: 15px" v-if="scope.row.building.location" @click="houseDevicesDosage(scope.row.deviceId)">
						{{scope.row.building.location.name}}{{scope.row.building.building}}幢{{scope.row.building.unit}}单元{{scope.row.building.roomNumber}}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="租户" v-if="loading===1">
				<template slot-scope="scope">
					<div v-if="scope.row.contract&&scope.row.contract.user"  @click="houseDevicesDosage(scope.row.deviceId)" class="cursorp">
						{{scope.row.contract.user.name}} {{scope.row.contract.userId}}
					</div>
				</template>
			</el-table-column>

			<el-table-column label="备注">
				<template slot-scope="scope">
					<div class="flexc remake">
						<div v-if="scope.row.memo">
							{{scope.row.memo}}
						</div>
						<div v-if="!scope.row.memo">
							-
						</div>
						<div @click="setElectricit(scope.row)" class="cursorp change">
                            修改
                        </div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="开关状态">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status.switch" active-color="#13ce66" inactive-color="#ff4949" active-value="EMC_ON" inactive-value="EMC_OFF"
					    @change="eleciricitySwitch" class="aaa">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="删除">
				<template slot-scope="scope">
					<el-button icon="el-icon-delete" @click="delElectric(scope.row)" :disabled="loading===1" size="mini"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="修改备注" :visible.sync="dialogVisible" width="30%" class="changeRemake">
            <div class="flexc">
				<el-input v-model="remakeInput" type="textarea" placeholder="请输入备注"></el-input>
			</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="notify()">取 消</el-button>
                <el-button type="primary" @click="notify(deviceInfo)">确 定</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
import format from 'date-fns/format';
import { houseDevicesDosage } from '~/modules/house';
export default {
	props: {
		devices: {
			type: Array
		},
		type: {
			required: true
		},
		loading: {
			type: Number
		},
		index: {
			type: Number
		},
		equipmentLoading: {
			type: Boolean
		}
	},
	data() {
		return {
			reqData: {
				mode: '',
				devicesIds: []
			},
			remakeInput: '',
			deviceInfo: '',
			dialogVisible: false
		};
	},
	computed: {
		projectId() {
			return this.$store.state.userInfo.user.projectId;
		}
	},
	methods: {
		notify(val) {
			this.dialogVisible = false;
			if (val) {
				this.$model('change_remake')
					.update(
						{ memo: this.remakeInput },
						{ projectId: this.projectId, id: val.deviceId }
					)
					.then(res => {
						this.$message.success('备注修改成功');
						this.$emit('restoreSwitch');
					})
					.catch(err => {
						this.$message('备注修改失败');
					});
			}
		},
		setElectricit(data) {
			this.deviceInfo = data;
			this.dialogVisible = true;
		},
		houseDevicesDosage(data) {
			this.$modal.$emit('open', {
				comp: houseDevicesDosage,
				data: {
					houseDevice: data,
					oneEquipment: true
				},
				title: '使用详情'
			});
		},
		fixed(val) {
			return (val / 10000).toFixed(2);
		},
		delYTL(val) {
			return val.replace(/YTL/g, '');
		},
		// 批量送电/断电
		setElectricSwitch(data) {
			if (this.reqData.devicesIds.length !== 0) {
				this.reqData.mode = data;
				this.sendElectric();
			} else {
				this.$message.error('请至少选择一个仪表');
			}
		},
		// 批量删除
		setDelElectric() {
			if (this.reqData.devicesIds.length !== 0) {
				this.deleteElectric();
			} else {
				this.$message.error('请至少选择一个仪表');
			}
		},
		delElectric(data) {
			this.reqData.devicesIds = [];
			this.reqData.devicesIds.push(data.deviceId);
			this.deleteElectric();
		},
		deleteElectric() {
			this.$confirm('将要删除此电表, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$model('delDevices')
						.delete(
							{
								deviceIds: this.reqData.devicesIds
							},
							{
								projectId: this.projectId,
								id: 'devices'
							}
						)
						.then(res => {
							this.$message.success('删除成功');
							this.$emit('refresh', 'second');
						})
						.catch(err => {
							this.$message('删除失败');
						});
					this.$set(this.reqData, 'devicesIds', []);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		select(val, b) {
			this.reqData.devicesIds = val.map(ele => {
				return ele.deviceId;
			});
		},
		selectAll(val) {
			this.reqData.devicesIds = val.map(ele => {
				return ele.deviceId;
			});
		},
		indexMethod(data) {
			return (this.index - 1) * 20 + data + 1;
		},
		dateTime(data) {
			return format(new Date(data), 'YYYY-MM-DD  HH:mm:ss');
		},
		eleciricitySwitch(data) {
			this.reqData.mode = data;
		},
		handleRowHandle(row, event) {
			if (
				event.screenX !== 0 &&
				event.srcElement.className === 'el-switch__core'
			) {
				this.reqData.devicesIds = [];
				this.reqData.devicesIds.push(row.deviceId);
				this.sendElectric();
			}
		},
		sendElectric() {
			this.$confirm('将更改电表状态, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$model('electricity_instructions')
						.patch(this.reqData, {
							projectId: this.projectId,
							id: 'switch'
						})
						.then(res => {
							this.$message.success('切换状态成功');
							this.reqData.devicesIds.length > 1
								? this.$emit('restoreSwitch')
								: this.test();
						})
						.catch(err => {
							// 刷新失败重新请求恢复el-switch
							this.$message('切换状态失败');
							this.reqData.devicesIds.length > 1
								? this.test()
								: this.$emit('restoreSwitch');
						});
					this.$set(this.reqData, 'devicesIds', []);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
					this.reqData.devicesIds.length > 1
						? this.test()
						: this.$emit('restoreSwitch');
				});
		},
		test() {}
	},
	watch: {}
};
</script>

<style lang="less" scoped>
.remake {
	&:hover .change {
		opacity: 1;
	}
	.change {
		margin-left: 5px;
		color: #409eff;
		opacity: 0;
	}
}
</style>

<style lang="less">
.changeRemake .el-dialog__body {
	padding: 10px 20px;
	textarea {
		height: 80px;
	}
}
</style>
