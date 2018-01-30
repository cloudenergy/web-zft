<template>
	<div class="add-house-form">
		<el-form :model="form" class="mini-form">
			<h3>房源信息</h3>
			<base-info @change="mergeBaseInfo" :form="form" @houseTypeChange='houseTypeChange'></base-info>
			<div class="group">
				<el-autocomplete width="400" v-model="form.community" class="full" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
				    @select="handleSelect" auto-complete="off">
					<template slot="prepend">小区</template>
				</el-autocomplete>
			</div>
			<div class="group">
				<el-input v-model="form.location.address" auto-complete="off">
					<template slot="prepend">地址</template>
				</el-input>
				<el-input v-model="form.layout.name" auto-complete="off">
					<template slot="prepend">名称</template>
				</el-input>
			</div>
			<div class="group" v-if="form.houseFormat!==houseTypes.ENTIRE[0]">
				<div class="inputs">
					<el-input v-model="building" @blur="changeBuilding">
						<template slot="prepend">序号</template>
						<template slot="append">幢</template>
					</el-input>
					<el-input v-model="unit" @blur="changeUnit">
						<template slot="append">单元</template>
					</el-input>
					<el-input v-model="form.roomNumber">
						<template slot="append">室</template>
					</el-input>
					<el-select v-model="form.orientation" placeholder="方位" style="opacity:0">
						<el-option value="E" label="东">东</el-option>
					</el-select>
				</div>
			</div>
			<room-layout v-model="form.layout" :rentType="form.houseFormat"></room-layout>
			<building-floor v-if="form.houseFormat==houseTypes.ENTIRE[0]" :data="Entire"></building-floor>
			<div class="group" v-if="form.houseFormat!==houseTypes.ENTIRE[0]">
				<el-input v-model.number="form.layout.roomArea" auto-complete="off" placeholder="面积">
					<template slot="prepend">面积</template>
				</el-input>
				<el-input v-model.number="form.currentFloor" auto-complete="off" placeholder="层高">
					<template slot="prepend">层高</template>
				</el-input>
				<el-input v-model.number="form.totalFloor" auto-complete="off" placeholder="总层数">
					<template slot="prepend">总层数</template>
				</el-input>
			</div>
			<h3>房源配置</h3>
			<house-facility class="checkboxes" v-model="form.config"></house-facility>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dismiss()">取 消</el-button>
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
		computed: {
			...mapState(['houseTypes', 'user'])
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
						name: ''
					},
					houseFormat: 'SHARE'
				},
				Entire: {
					totalFloor: 7,
					houseCountOnFloor: '',
					enabledFloors: []
				}
			};
		},
		components: {
			BaseInfo
		},
		created() {
			Object.assign(this.form, this.item);
		},
		watch: {
			form(newVal, oldVal) {
				console.log(newVal, oldVal)
			}
		},
		methods: {
			refresh() {
				console.log(1)
			},
			houseTypeChange() {

			},
			changeBuilding() {
				this.form.building = this.building + '幢'
			},
			changeUnit() {
				this.form.unit = this.unit + '单元'
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
				const data = {
					projectId: this.$store.state.user.projectId,
					...this.form
				};
				if (data.houseFormat === 'ENTIRE') {
					data.totalFloor = this.Entire.totalFloor
					data.houseCountOnFloor = this.Entire.houseCountOnFloor
					data.enabledFloors = this.Entire.enabledFloors
				}
				this.$modal.$emit('dismiss');
				this.$model('houses').create(data, {
						projectId: this.user.projectId
					})
					.then(res => {
						this.$message.success('创建成功')
						this.$emit('addhouse')
					})
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
			width: 100%;

			.el-input-group {
				width: 80%;
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
</style>