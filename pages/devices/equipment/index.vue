<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="houseFormat" @communityChange='communityChange' />
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto;padding-right:0">
				<div class="ops-bills">
					<div class="flexcenter">
						<rooms-select @input="search" v-model="info.room"></rooms-select>
						<room-manager @input="manager" v-model="info.manager" />
					</div>
					<div class="flexcenter">
						<span class="result-info">{{paging.count}}项结果</span>
						<div class="actions">
							<!-- <el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button> -->
						</div>
					</div>
				</div>
				<search-all title="搜索" @keyup="keyup"></search-all>
			</el-header>
			<el-main style="max-width:100%;padding-right:0;padding:0;margin-left:10px">
				<equipmentset :devices="devices" :type="this.reqData.mode" :loading="loading" ref="equipmentset" @refresh='refresh' @restoreSwitch="restoreSwitch"
				    :index="reqData.index" :equipmentLoading='equipmentLoading'/>
				<div class="flexcenter batch">
					<div class="flexc cursorp">
						<span @click="electric('EMC_ON')">批量送电</span>
						<span @click="electric('EMC_OFF')">批量断电</span>
						<span v-if="loading===2" @click="deleteElectric">批量删除</span>
					</div>
					<el-pagination :background="background" layout="prev, pager, next" :total='paging.count' @current-change="handleCurrentChange"
					    style="margin-top:5px;text-align:right" :page-size='20'>
					</el-pagination>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		equipmentset
	} from '~/modules/devices'
	import {
		RentSearch
	} from '~/modules/rent'
	import _ from 'lodash'
	export default {
		components: {
			Tab,
			RentSearch,
			equipmentset
		},
		data() {
			return {
				background: true,
				houseFormat: 'SHARE',
				info: {
					search: '',
					room: '',
					manager: ''
				},
				houses: [],
				paging: '',
				testArray: [],
				entire: false,
				tabCard: true,
				entireHouse: [],
				reqData: {
					size: 20,
					index: 1,
					mode: 'BIND'
				},
				devices: [],
				loading: 1,
				equipmentLoading:false
			}
		},
		computed: {
			projectId() {
				return this.$store.state.userInfo.user.projectId
			}
		},
		mounted() {
      this.$root.$emit('successRefresh')
      this.communityChange('0')
		},
		methods: {
			// 搜索
			keyup(val) {
				this.setSearch(val)
			},
			restoreSwitch() {
				this.query()
			},
			setSearch(val) {
				this.reqData.q = val;
				this.query()
			},
			electric(data) {
				this.$refs.equipmentset.setElectricSwitch(data)
			},
			deleteElectric() {
				this.$refs.equipmentset.setDelElectric()
			},
			handleCurrentChange(val) {
				this.equipmentLoading = true;
				this.reqData.index = val;
				this.query()
			},
			communityChange(data) {
				if (data === '0') {
					delete this.reqData.locationId
					this.query()
				} else {
					this.reqData.locationId = data
					this.query()
				}
			},
			sendThird() {
				this.query()
			},
			query() {
				this.$model('devices')
					.query(this.reqData, {
						projectId: this.projectId
					})
					.then(res => {
						this.loading = this.reqData.mode === 'FREE' ? 2 : 1
						this.$set(this, 'devices', _.chunk(res.data, 20)[0])
						this.$set(this, 'paging', res.paging)
						this.equipmentLoading = false
					})
					.catch(err => {
					})
			},
			showmessage(data) {
			},
			search(data) {
			},
			roomSearch(data) {
			},
			manager(data) {
			},
			refresh(type, commiunityId) {
				if (type === 'BIND') {
          this.reqData.locationId = commiunityId
					this.reqData.mode = 'BIND'
				} else if (type === 'FREE') {
					this.reqData.mode = 'FREE'
				} else {
					this.reqData.houseFormat = type
					if (commiunityId !== undefined) {
						this.reqData.locationId = commiunityId
					} else {
						delete this.reqData.locationId
					}
				}
				delete this.reqData.houseFormat
				this.query();
			}
		}
	}
</script>

<style lang="less" scoped>
	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 17px;
		margin-top: 5px;
		div.flexcenter:first-child {
			width: 366px;
		}
	}

	.result-info {
		margin-right: 5px
	}

	.batch {
		span {
			margin-right: 30px;
			color: #409eff;
		}
	}
</style>
<style lang="less">
	.devices {
		.el-header,.el-main {
			padding-left:10px;
		}
	}
 </style>
