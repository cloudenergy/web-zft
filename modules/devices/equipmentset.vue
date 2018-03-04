<template>
	<div>
		<el-table :data="devices" style="width: 100%" @row-click='handleRowHandle'>
			<el-table-column type="index" :index="indexMethod">
            </el-table-column>
			<el-table-column label="设备id" width="130" prop="deviceId">
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<div v-if="scope.row.status.service==='EMC_ONLINE'">正常</div>
					<div v-if="scope.row.status.service==='EMC_OFFLINE'">异常</div>
				</template>
			</el-table-column>
			<el-table-column label="读数" prop="scale">
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
					<el-switch
						v-model="scope.row.status.status"
						active-color="#13ce66"
						inactive-color="#ff4949"
						active-value="EMC_ON"
						inactive-value="EMC_OFF"
						@change="eleciricitySwitch">
					</el-switch>
				</template>
			</el-table-column >
			<el-table-column label="删除"  v-if="loading===2">
				<template slot-scope="scope">
					<!-- <div>删除</div> -->
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import format from 'date-fns/format'
	export default {
		props:{
			devices:{
				type:Array
			},
			type: {
				required:true
			},
			loading: {
				type:Number
			}
		},
		data() {
			return {
				reqData:{
					mode:'',
					devicesIds:[]
				}
			}
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			}
		},
		methods: {
			indexMethod(data) {
				return (1-1)*20+data+1
			},
			dateTime(data) {
				return format(new Date(data),'YYYY-MM-DD  HH:mm:ss')
			},
			eleciricitySwitch(data) {
				if (data) {
					this.reqData.mode = 'EMC_ON'
				} else {
					this.reqData.mode = 'EMC_OFF'
				}
			},
			handleRowHandle(row, event) {
				if(event.screenX!==0&&event.srcElement.className==='el-switch__core'){
					this.reqData.devicesIds=[]
					this.reqData.devicesIds.push(row.deviceId)
					this.$model('electricity_instructions')
					.patch(this.reqData, {
						projectId: this.projectId,
						id: 'switch'
					})
					.then(res => {
						console.log(res)
					})
				}
				
            },
		},
		watch: {
			
		}
	};
</script>

<style lang="less" scoped>
	
</style>