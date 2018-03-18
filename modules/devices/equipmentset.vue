<template>
	<div>
		<el-table :data="devices" style="width: 100%" @row-click='handleRowHandle' @select="select" @select-all="selectAll" v-loading="equipmentLoading">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" :index="indexMethod" label="序号">
			</el-table-column>
			<el-table-column label="设备id" width="130" prop="deviceId">
				<template slot-scope="scope">
					<div>
						{{delYTL(scope.row.deviceId)}}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
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
					<div>{{dateTime(scope.row.updatedAt*1000)}}</div>
				</template>
			</el-table-column>
			<el-table-column label="关联房源" v-if="loading===1">
				<template slot-scope="scope">
					<div class="flexcenter" style="padding-right: 15px" v-if="scope.row.building.location">
						{{scope.row.building.location.name}}{{scope.row.building.building}}幢{{scope.row.building.unit}}单元{{scope.row.building.roomNumber}}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="租户" v-if="loading===1">
				<template slot-scope="scope">
					<div v-if="scope.row.contract&&scope.row.contract.user">
						{{scope.row.contract.user.name}} {{scope.row.contract.userId}}
					</div>
				</template>
			</el-table-column>

			<el-table-column label="备注">
				<template slot-scope="scope">
					<div>

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
	</div>
</template>

<script>
	import format from 'date-fns/format'
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
				}
			}
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			}
		},
		methods: {
			houseDevicesDosage(data) {
				this.$modal.$emit('open', {
					comp: houseDevicesDosage,
					data: {
						houseDevice:data,
						oneEquipment:true
					},
					title: '使用详情'
				});
			},
			fixed(val) {
				return val.toFixed(2)
			},
			delYTL(val) {
				return val.replace(/YTL/g, '')
			},
			// 批量送电/断电
			setElectricSwitch(data) {
				if (this.reqData.devicesIds.length !== 0) {
					this.reqData.mode = data
					this.sendElectric()
				} else {
					this.$message.error('请至少选择一个仪表')
				}
			},
			// 批量删除
			setDelElectric() {
				console.log(1)
				if (this.reqData.devicesIds.length !== 0) {
					this.deleteElectric()
				} else {
					this.$message.error('请至少选择一个仪表')
				}
			},
			delElectric(data) {
				this.reqData.devicesIds = []
				this.reqData.devicesIds.push(data.deviceId)
				this.deleteElectric()
			},
			deleteElectric() {
				this.$confirm('将要删除此电表, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$model('delDevices')
					.delete({
						deviceIds: this.reqData.devicesIds
					}, {
						projectId: this.projectId,
						id: 'devices'
					})
					.then(res => {
						this.$message.success('删除成功')
						this.$emit('refresh', 'second')
					})
					.catch(err => {
						console.log(err)
						this.$message('删除失败')
					})
					this.$set(this.reqData,'devicesIds',[])
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			select(val, b) {
				this.reqData.devicesIds = val.map(ele => {
					return ele.deviceId
				})
			},
			selectAll(val) {
				this.reqData.devicesIds = val.map(ele => {
					return ele.deviceId
				})
			},
			indexMethod(data) {
				return (this.index - 1) * 20 + data + 1
			},
			dateTime(data) {
				return format(new Date(data), 'YYYY-MM-DD  HH:mm:ss')
			},
			eleciricitySwitch(data) {
				this.reqData.mode = data
			},
			handleRowHandle(row, event) {
				if (event.screenX !== 0 && event.srcElement.className === 'el-switch__core') {
					this.reqData.devicesIds = []
					this.reqData.devicesIds.push(row.deviceId)
					this.sendElectric()
				}
			},
			sendElectric() {
				this.$confirm('将更改电表状态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$model('electricity_instructions')
						.patch(this.reqData, {
							projectId: this.projectId,
							id: 'switch'
						})
						.then(res => {
							this.$message.success('切换状态成功')
							this.reqData.devicesIds.length > 1 ? this.$emit('restoreSwitch') : this.test()
						})
						.catch(err => {
							// 刷新失败重新请求恢复el-switch
							this.$message('切换状态失败')
							this.reqData.devicesIds.length > 1 ? this.test() : this.$emit('restoreSwitch')
						})
						this.$set(this.reqData,'devicesIds',[])
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
					this.reqData.devicesIds.length > 1 ? this.test() : this.$emit('restoreSwitch')
				});
			},
			test() {}
		},
		watch: {

		}
	};
</script>

<style lang="less" scoped>
</style>