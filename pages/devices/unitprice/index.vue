<template>
  <el-container>
    <el-aside class="page-bill-index" width="auto">
      <div>
        <Tab @change="refresh" :selected="reqData.houseFormat" @communityChange='communityChange' @cityArea="cityArea"/>
      </div>
    </el-aside>
    <el-container>
      <el-header style="height:auto;padding-right:0">
        <div class="ops-bills">
          <div class="flexcenter searchset">
						<span v-if="!configurationStatus">
							<myIconYufu/><span class="myiconintroduce">预付费</span>
							<myIconZujin/><span class="myiconintroduce">随租金付</span>
							<myIconNum/><span class="myiconintroduce">1号付费，其他数字以此类推</span>
						</span>
            <span v-if="configurationStatus">
						</span>
          </div>
          <div class="flexcenter">
            <span class="result-info">{{countInfo.count}}项结果</span>
            <div class="actions">
              <!-- <el-button type="warning" size="mini" @click="importrent('rentinfo')">
                                导出
                                <i class="el-icon-sort"></i>
                            </el-button> -->
            </div>
          </div>
        </div>
        <div class="search">
          <search-all :title="'搜索小区/门牌/电话'" @keyup="keyup"></search-all>
        </div>

      </el-header>
      <el-main style="padding:0 0 0 10px;overflow:hidden">
        <setUnitPrice :homePrice="houses" :countInfo='countInfo' @refresh="choose_refresh"
                      @copyStatusChange='copyStatusChange' :houseFormat='houseFormat'/>
        <div v-loading="loading"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import _ from 'lodash'
  import fp from 'lodash/fp'
  import {
    Tab
  } from '~/modules/house';
  import {
    RentSearch
  } from '../../../modules/rent'
  import {
    setUnitPrice,
    myIconNum,
    myIconYufu,
    myIconZujin
  } from '../../../modules/unitprice'

  export default {
    components: {
      Tab,
      RentSearch,
      setUnitPrice,
      myIconNum,
      myIconYufu,
      myIconZujin
    },
    data() {
      return {
        houseFormat: 'SHARE',
        houses: [],
        countInfo: {},
        reqData: {
          houseFormat: 'SHARE',
          size: '200',
          index: 1
        },
        configurationStatus: false,
        loading: true
      };
    },
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId;
      },
    },
    mounted() {
      window.addEventListener(
        'scroll',
        this.scrollFunc,
        true
      );
    },
    beforeDestroy() {
      window.removeEventListener(
        'scroll',
        this.scrollFunc,
        true
      );
    },
    methods: {
      keyup(val) {
        this.setSearch(val)
      },
      setSearch(data) {
        if (/rent/.test(location.pathname)) {
          if (data !== '') {
            this.reqData.q = data
          }
          else {
            delete this.reqData.q
          }
          this.query()
        }
      },
      scrollFunc() {
        let elm = document.getElementsByClassName('main')[0];
        this.loading = false;
        const offset = elm.scrollTop + elm.clientHeight;
        const height = elm.scrollHeight;

        if (offset >= height
          && this.houseFormat !== 'ENTIRE'
          && this.reqData.index > -1
          && (/unitprice/.test(window.location.pathname))) {
          this.query()
        }
        return
      },
      copyStatusChange(data) {
        this.configurationStatus = data
      },
      refresh(type, commiunityId) {
        this.reqData.houseFormat = type
        if (commiunityId !== undefined) {
          this.reqData.locationId = commiunityId
        } else {
          delete this.reqData.locationId
        }
        this.query(true);
      },
      choose_refresh() {
        this.query(true);
      },
      query(val) {
        if(val) {this.reqData.index = 1}
        this.$model('houses')
          .query(
            this.reqData, {projectId: this.projectId}
          )
          .then(res => {
            if (val) {
              this.$set(this, 'houses', res.data)
              this.reqData.index = 2
            } else {
              if (fp.isEmpty(res.data)) {
                this.reqData.index = -1;
                return
              }
              res.data.forEach(element => {
                this.houses.push(element)
              });
              this.$set(this, 'countInfo', res.paging)
              this.houseFormat = this.reqData.houseFormat
              this.reqData.index++
              setTimeout(() => {
                this.loading = false
              }, 500)
            }
          });
      },
      showmessage(data) {
      },
      communityChange(data) {
        if (data === '0') {
          delete this.reqData.locationId
        } else {
          this.reqData.locationId = data
        }
        this.query(true)
      },
      cityArea(data) {
        if (_.isUndefined(data)) {
          delete this.reqData.divisionId
        }
        else {
          this.reqData.districtId = data.area || data.city
        }
        this.query(true)
      },
    }
  };
</script>
<style lang="less" scoped>
  .ops-bills {
    // margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  .myiconintroduce {
    margin-right: 30px;
    font-weight: 350;
  }

  .result-info {
    margin-right: 5px;
  }

  .search {
    margin-top: 14px;
  }
</style>
<style lang="less">
  .searchset .nonemargin {
    margin-left: 0
  }

  .devices {
    .el-header, .el-main {
      padding-left: 10px;
    }
  }
</style>

