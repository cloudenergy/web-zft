<template>
	<div class="add-house-form">
		<el-form :model="form" class="mini-form">
			<h3>房源信息</h3>
			<base-info @change="mergeBaseInfo" :form="form" @houseTypeChange='houseTypeChange'></base-info>
				<el-row :gutter="20">
					<el-col :span="16">
					<el-autocomplete v-model="form.community" class="full" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"
						auto-complete="off" style="width:103%">
						<template slot="prepend">小区</template>
					</el-autocomplete>
					</el-col>
					<el-col :span="8" style="position:relative" class="roomInfo flexc">
						<el-select v-model="form.layout.orientation" placeholder="方位" style="display:inline-block;width:163px">
							<el-option value="E" label="东">东</el-option>
							<el-option value="S" label="南">南</el-option>
							<el-option value="W" label="西">西</el-option>
							<el-option value="N" label="北">北</el-option>
						</el-select>
						<span tabindex="0" class="el-input-group__append addwidth toward" style="padding:0 0 0 13px;width:53px">朝向</span>
					</el-col>
				</el-row>
			<div v-if="form.houseFormat!==userInfo.houseTypes.ENTIRE[0]">
				<el-row :gutter="20">
					<el-col :span="8">
					<el-input v-model="building" @blur="changeBuilding">
						<template slot="prepend">序号</template>
						<template slot="append">幢</template>
					</el-input>
					</el-col>
					<el-col :span="8">
					<el-input v-model="unit" @blur="changeUnit">
						<template slot="append" style="width:53px">单元</template>
					</el-input>
					</el-col>
					<el-col :span="8">
					<el-input v-model="form.roomNumber">
						<template slot="append">室</template>
					</el-input>
					</el-col>
				</el-row>
			</div>
			<room-layout v-model="form.layout" :rentType="form.houseFormat"></room-layout>
			<building-floor v-if="form.houseFormat==userInfo.houseTypes.ENTIRE[0]" :data="Entire"></building-floor>
			<div v-if="form.houseFormat!==userInfo.houseTypes.ENTIRE[0]">
				<el-row :gutter="20">
					<el-col :span="8" class="roomInfo">
						<el-input v-model.number="form.layout.roomArea" auto-complete="off" placeholder="面积">
							<template slot="prepend">信息</template>
							<template slot="append">㎡</template>
						</el-input>
					</el-col>
					<el-col :span="8" class="roomInfo">
						<el-input v-model.number="form.currentFloor" auto-complete="off" placeholder="层高">
							<template slot="append">楼</template>
						</el-input>
					</el-col>
					<el-col :span="8" class="roomInfo">
						<el-input v-model.number="form.totalFloor" auto-complete="off" placeholder="总层数">
							<template slot="append">数</template>
						</el-input>
					</el-col>
				</el-row>
			</div>
			<h3 style="margin-top:30px">房源配置</h3>
			<house-facility class="checkboxes" v-model="form.config"></house-facility>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dismiss()">取 消</el-button>
			<el-button @click="saveAndcontinueToAdd()" v-if="form.houseFormat!==userInfo.houseTypes.ENTIRE[0]">保存并继续添加</el-button>
			<el-button type="primary" @click="save()">保存</el-button>
		</div>
	</div>
</template>

<script>
	import BaseInfo from './base-info';
	import {
		mapState
	} from 'vuex';
	import fp from 'lodash/fp';
	export default {
		props: {
			item: {
				type: Object
			}
		},
		// todo i
		computed: {
			...mapState(['userInfo', 'user']),
			projectId() {
    			return this.$store.state.userInfo.user.projectId;
    		},
		},
		data() {
			return {
				layouts: [],
				building: '',
				unit: '',
				roomNumber: '',
				form: {
					group: '',
					building: '',
					unit: '',
					roomNumber: '',
					location: {},
					layout: {
						name: '',
						orientation:'S',
						bedRoom: 2,
						livingRoom: 1,
						bathRoom: 1,
					},
					houseFormat: 'SHARE'
				},
				Entire: {
					totalFloor: 7,
					houseCountOnFloor: '',
					enabledFloors: []
				},
				houseCode:null
			};
		},
		components: {
			BaseInfo
		},
		created() {
			Object.assign(this.form, this.item);
		},
		methods: {
			houseTypeChange() {

			},
			changeBuilding() {
				this.form.building = this.building
			},
			changeUnit() {
				this.form.unit = this.unit
			},
			translate(res) {
				return {
					value: `${res.name}`,
					address: res.address,
					code: res.code,
					district: res.district,
					divisionId: res.divisionId,
					latitude: res.latitude,
					longitude: res.longitude,
					name: res.name
				};
			},
			mergeBaseInfo(val) {
				Object.assign(this.form, val);
			},
			querySearchAsync(queryString, cb) {
				if (queryString != undefined && this.form.city) {
					this.$model(
						'locations', {
							q: queryString,
							city: this.form.city
						}, {}
					).then(res => {
						const displayRooms = fp.map(this.translate)(res);
						cb(displayRooms);
					});
				} else {
					cb([]);
				}
			},
			handleSelect(item) {
				delete item.value;
				this.form.location = item;
			},
			dismiss() {
				this.$modal.$emit('dismiss');
			},
			save() {
				this.saveCloseQ('close')
				this.$modal.$emit('dismiss');
			},
			saveAndcontinueToAdd() {
				this.saveCloseQ('noCLose')
			},
			saveCloseQ(val) {
				const data = {
					projectId: this.$store.state.userInfo.user.projectId,
					...this.form
				};
				if(data.code!==this.houseCode) {
					this.houseCode = data.code
					if (data.houseFormat === 'ENTIRE') {
						data.totalFloor = this.Entire.totalFloor
						data.houseCountOnFloor = this.Entire.houseCountOnFloor
						data.enabledFloors = this.Entire.enabledFloors
					}
					this.$model('houses').create(data, {
						projectId: this.projectId
					})
					.then(res => {
						this.$message.success('创建成功')
						this.$emit('addhouse')
						this.$store.dispatch('ADD_COMMUNITY',{val:res})
					})
					.catch(err=>{
						this.$message('创建失败')
					})
				}else{
					this.$message('房源编号未更改')
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.dialog-footer {
		text-align: right;
	}

	.el-form {
		h3 {
			margin-bottom: 20px;
		}

		.el-checkbox-group {
			width: 100%;
		}
	}
</style>

<style lang="less">
	.add-house-form {
		.el-autocomplete {
			width: 56%;

			.el-input-group {
				width: 96%;
			}
		}
	}

	.group .inputs {
		display: flex;

		>.el-input {
			width: 24%;
			margin: 2px 10px 2px 0px;
		}
	}
	.direction{
		position: absolute;
		width:153px;
		top:0;
		left:75px;
	}
	.addwidth{
		width: 65px;
		height: 28px;
		line-height:28px
	}
	.toward {
		padding:0 0 0 13px;
		width: 53px;
		font-size:14px;
		display:inline-block
	}
</style>