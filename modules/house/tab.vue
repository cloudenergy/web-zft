<template>
  <div class="secondary-side">
    <el-tabs v-model="type" @tab-click="change" v-if="!urlLocation">
      <el-tab-pane v-for="item in userInfo.houseTypes" :key="item[0]" :label="item[1]" :name="item[0]"/>
    </el-tabs>
    <el-tabs v-model="bindEquipment" @tab-click="change" v-if="urlLocation">
      <el-tab-pane label="已绑定" name="first"/>
      <el-tab-pane label="" name="first"/>
      <el-tab-pane label="未绑定" name="second"/>
    </el-tabs>
    <city-area @change="districtChanged" ref="cityChoose" :clickType="clickType" @cityChange="cityChange" :type="type"/>
    <el-menu @select="handleSelect" ref="menuLocation" :style="menuStyle(community)" style="overflow:hidden">
      <el-menu-item index='0' ref="activeMenu" v-if="communityType!=='ENTIRE'" :class="{'is-active':typeNum===index}">
        <div slot="title" class="flexcenter"><span><span>全部小区</span><span v-if="urlLocation">/整幢</span></span><span
          class="communityNumber" v-if="!communityTable">数量:{{communityCount}}</span></div>
      </el-menu-item>
      <el-menu-item v-for="(item, index) in filteredCommunity" :key="index" :index="String(item.geoLocationId)"
                    :class="{'is-active':typeNum===item.geoLocationId}" v-if="!communityTable">
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import fp from 'lodash/fp'

  export default {
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      defaultHouseType() {
        return this.$store.state.defaultHouseType
      },
      projectId() {
        return this.$store.state.userInfo.projectId
      },
      urlLocation() {
        return /equipment/.test(window.location.pathname)
      },
      communityCount() {
        return this.filteredCommunity.length;
      },
      filteredCommunity() {
        return fp.pipe(
          fp.filter(c => fp.isEmpty(this.areaFilter) ? true : fp.get('areaId')(c) === this.areaFilter),
          fp.filter(c => fp.isEmpty(this.cityFilter) ? true : fp.get('cityId')(c) === this.cityFilter)
        )(this.community);
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
        cityFilter: null,
        areaFilter: null,
        bindEquipment: 'first',
        addHouse: false,
        communityTable: false
      };
    },
    created() {
      this.updateCommunity();
      var a = 0;
      a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.h = a - 177
      this.$root.$on('successRefresh', () => {
        this.updateCommunity();
      })
    },
    methods: {
      menuStyle(community = []) {
        if ((!fp.isUndefined(this.$refs.menuLocation)) && community.length !== 0) {
          const b = (community.length + 1) * 42 + 30;
          return `height:${this.h < b ? b : this.h}px`
        }
      },
      change(tab, event) {
        this.communityTable = tab.name === 'second';
        this.clickType = tab.name
        this.firNum = 0
        this.clearFilters()
        this.updateCommunity()
        this.$refs.cityChoose.houseFormatChange(tab.name)
      },
      clearFilters() {
        this.$set(this, 'areaFilter', null);
        this.$set(this, 'cityFilter', null)
      },
      districtChanged(filters) {
        if (filters.area !== '') {
          this.$set(this, 'areaFilter', filters.area);
          this.$emit('cityArea', {area: filters.area})
        } else {
          this.clearFilters();
          this.$emit('cityArea')
        }
      },
      cityChange(data) {
        if (data.city === '') {
          this.clearFilters();
          this.$emit('cityArea')
        } else {
          this.$set(this, 'cityFilter', data.city);
          this.$emit('cityArea', {city: data.city})
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
      extractCommunities(data) {
        const flattenResult = fp.pipe(fp.values, fp.map(fp.pipe(fp.values, fp.flatten)), fp.flatten);
        const extracts = fp.mapValues(city => fp.pipe(fp.get('districts'), fp.mapValues(area => {
            const attributes = fp.map(fp.defaults({cityId: city.districtId, areaId: area.districtId}));
            return fp.pipe(fp.getOr([])('communities'), attributes)(area)
          }))(city)
        );
        return fp.pipe(extracts, flattenResult)(data)
      },
      updateCommunity() {
        this.$store
          .dispatch('GET_COMMUNITIES', {
            houseType: this.type,
            districtsCode: this.filters.area || this.filters.city,
          })
          .then(data => {
            this.$set(this, 'community', this.extractCommunities(data));
            // 绑表页面全部小区
            if (this.urlLocation) {
              this.$emit('change', this.clickType)
            } else {
              this.communityType = this.type;
              if (this.type === 'ENTIRE' && this.community.length !== 0) {
                this.typeNum = this.community[0].geoLocationId;
                this.$emit('change', this.clickType, this.community[0].geoLocationId)
              } else {
                this.typeNum = '0';
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
    .el-tabs__item {
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
