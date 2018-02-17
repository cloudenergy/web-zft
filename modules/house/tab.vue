<template>
	<div class="secondary-side">
		<el-tabs v-model="type" @tab-click="change">
			<el-tab-pane v-for="item in houseTypes" :key="item[0]" :label="item[1]" :name="item[0]" />
		</el-tabs>
		<city-area @change="districtChanged" ref="cityChoose" :clickType="clickType" @cityChange="cityChange"/>
		<el-menu @select="handleSelect" ref="menuLocation" :style="menuStyle()">
			<el-menu-item index='0' ref="activeMenu" v-if="communityType!=='ENTIRE'" :class="{'is-active':typeNum==index}">
				<!-- <i class="el-icon-menu"></i> -->
				<span slot="title">全部小区</span>
			</el-menu-item>
			<el-menu-item v-for="(item, index) in community" :key="index" :index="String(item.geoLocationId)" :class="{'is-active':typeNum==item.geoLocationId}">
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import _ from 'lodash'
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState(['houseTypes', 'defaultHouseType'])
		},
		props: {
			selected: null
		},
		data() {
			return {
				type: 'SHARE',
				filters: {
					city: '',
					area: ''
				},
				options: [],
				community: [],
				h: 0,
				clickType: 'SHARE',
				typeNum: 0,
				firNum: 0,
				index: '0',
				communityType: 'SHARE',
				showCommunity:''
			};
		},
		created() {
			this.updateCommunity();
			var a = 0;
			a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.h = a - 177
		},
		methods: {
			menuStyle() {
				return 'height:' + this.h + 'px'
			},
			change(tab, event) {
				this.clickType = tab.name
				this.firNum = 0
				this.updateCommunity()
				this.$refs.cityChoose.houseFormatChange(tab.name)
			},
			districtChanged(filters) {
				if(filters.area!==''){
					this.$emit('cityArea',{area:filters.area})
					this.community = this.showCommunity.filter((ele)=>{
						return ele.areaId == filters.area
					})
				}else{
					this.$emit('cityArea')
				}
				
			},
			cityChange(data) {
				if(data.city===''){
					this.$emit('cityArea')
					this.community = this.showCommunity
				}else{
					this.$emit('cityArea',{city:data.city})
					this.community = this.showCommunity.filter((ele)=>{
						return ele.cityId == data.city
					})
				}
			},
			handleSelect(key, keyPath) {
				this.typeNum = 'a'
				this.$emit('communityChange', key)
			},
			setChoose() {
				this.$refs.menuLocation.$children.forEach((item, index) => {
					item.$el.classList.value = "el-menu-item"
				})
			},
			updateCommunity(force = false) {
				this.$store
					.dispatch('GET_COMMUNITIES', {
						houseType: this.type,
						districtsCode: this.filters.area || this.filters.city,
						force
					})
					.then(data => {
						this.community = this.showCommunity = data
						this.communityType = this.type
						if (this.type == 'ENTIRE') {
							this.typeNum = data[0].geoLocationId
							this.$emit('change', this.clickType, data[0].geoLocationId)
						} else {
							this.typeNum = '0'
							this.$emit('change', this.clickType)
						}
						if (this.firNum !== 0) {
							this.setChoose()
						}
						this.firNum++
					});
			},
		}
	};
</script>

<style lang="less">
	.secondary-side {
		.el-tabs__nav-wrap {
			padding-left: 40px;
		}
		.el-menu-item,
		.el-submenu__title {
			height: 42px;
			line-height: 40px;
			text-align: left;
		}
	}
</style>

<style lang="less" scoped>
	.secondary-side {
		width: 240px;
		text-align: center;

		.el-menu {
			margin-top: 15px;
			padding: 15px 0;
			border-radius: 2px;
			border-right: 0;
			box-shadow: 0 0 4px #ddd;
			.el-menu-item.is-active {
				background-color: fade(@primary, 10);
				&:before {
					position: absolute;
					content: '';
					left: 0;
					top: 0;
					bottom: 0;
					width: 3px;
					background-color: @primary;
				}
			}
		}
	}
</style>