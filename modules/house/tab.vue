<template>
	<div class="secondary-side">
		<el-tabs v-model="type" @tab-click="change" v-if="!urlLocation">
			<el-tab-pane v-for="item in userInfo.houseTypes" :key="item[0]" :label="item[1]" :name="item[0]" />
		</el-tabs>
		<el-tabs v-model="bindEquipment" @tab-click="change" v-if="urlLocation">
			<el-tab-pane label="已绑定" name="first"/>
			<el-tab-pane label="" name="first" />
			<el-tab-pane label="未绑定" name="second"/>
		</el-tabs>
		<city-area @change="districtChanged" ref="cityChoose" :clickType="clickType" @cityChange="cityChange"/>
		<el-menu @select="handleSelect" ref="menuLocation" :style="menuStyle()" style="overflow:hidden">
			<el-menu-item index='0' ref="activeMenu" v-if="communityType!=='ENTIRE'" :class="{'is-active':typeNum==index}">
				<div slot="title" class="flexcenter"><span><span>全部小区</span><span v-if="urlLocation">/整幢</span></span><span class="communityNumber" v-if="!communityTable">数量:{{community.length}}</span></div>
			</el-menu-item>
			<el-menu-item v-for="(item, index) in community" :key="index" :index="String(item.geoLocationId)" :class="{'is-active':typeNum==item.geoLocationId}" v-if="!communityTable">
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
			...mapState(['userInfo', 'defaultHouseType']),
			projectId() {
				return this.$store.state.userInfo.projectId
			},
			urlLocation() {
				return /equipment/.test(window.location.pathname)
			},
			communities() {
				return this.$store.state.userInfo.communities
			}
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
				showCommunity:'',
				bindEquipment:'first',
				addHouse:false,
				communityTable:false
			};
		},
		created() {
			this.updateCommunity();
			var a = 0;
			a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.h = a - 177
		},
		watch: {
			communities(newVal,oldVal) {
				this.community = newVal
			}
		},
		methods: {
			menuStyle() {
				if((!_.isUndefined(this.$refs.menuLocation))&&this.community.length!==0){
					var b = (this.community.length+1)*42+30
					return `height:${this.h < b ? b : this.h}px`
				}
			},
			change(tab, event) {
				this.communityTable = tab.name==='second'?true:false
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
				this.$store.state.userInfo.index++
				this.typeNum = 'a'
				this.$emit('communityChange', key)
			},
			setChoose() {
				this.$refs.menuLocation.$children.forEach((item, index) => {
					item.$el.classList.value = "el-menu-item"
				})
			},
			updateCommunity(force = false,val) {
				this.$store
					.dispatch('GET_COMMUNITIES', {
						houseType: this.type,
						districtsCode: this.filters.area || this.filters.city,
						force,
						val
					})
					.then(data => {
						if(this.urlLocation){
							this.community = this.$store.state.userInfo.allCommunity
							this.$emit('change',this.clickType)
						}else{
							this.community = this.showCommunity = data
							this.communityType = this.type
							if (this.type == 'ENTIRE'&&data.length!==0) {
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
						}
						
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
		.el-tabs__item{
			height: auto;
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
		.communityNumber {
			text-align: right;
		}
	}
</style>