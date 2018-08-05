<template>
  <div class="page-house-index">
    <Tab @change="refresh" :selected="reqData.houseFormat" @communityChange='communityChange' ref="setLocation"
         class="communityTab" @cityArea="cityArea"/>
    <div class="main-container">
      <Search @changeRoom='changeRoom' @changeRoomsStatus='changeRoomsStatus' @changeHouseKeeper='changeHouseKeeper'
              :houseKeeper='houseKeeper'/>
      <search-all :title="'搜索小区/门牌/电话'" @keyup="keyup"></search-all>
      <div class="houses" ref="house">
        <div class="room" v-for="(house,index) in equipmentHouses" v-if="tabCard" :key="index">
          <div>
            <span v-if="!entire" class="houseName">{{house.location.name}} {{house.building}}幢 {{house.unit}}单元 {{house.roomNumber}}室</span>
            <span v-if="entire" style="font-size:24px">{{house[0].currentFloor}} 层</span>
            <span>
                            <el-tooltip content="房源预览" placement="top" style="margin:0 5px;">
                                <span @click="showHouse(house)">
                                    <icon type='iconupload' style="font-size:16px;margin-top:-1px"/>
                                </span>
                            </el-tooltip>
                            <el-dropdown placement="bottom-start">
                                <span>
                                    <icon type="gengduo1" style="font-size:15px;margin-top:3px"/>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="addRoom(house)">添加房间</el-dropdown-item>
                                    <el-dropdown-item @click.native="deleteHouse(house)">删除房源</el-dropdown-item>
                                    <el-dropdown-item @click.native="suspendHouse(house)" >关闭房源</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
            <span v-if="house.devices&&house.devices.length>0" class="cursorp" @click="openDeviceUsageChart(house)"
                  style="margin-left:4px">
							<icon type="jian" style="font-size:20px;color:#67c23a"
                    v-if="house.devices[0].status.service==='EMC_ONLINE'"/>
							<icon type="jian" style="font-size:20px;color:#FA5555"
                    v-if="house.devices[0].status.service==='EMC_OFFLINE'"/>
						</span>
            <!-- <span class="badge pull-right">{{house.rooms.length}}</span> -->
          </div>
          <div class="cells" v-if="!entire">
            <Room v-for="(room, index) in house.rooms" :key="index" :room="room" :house="house" class="cell"
                  @view="showDrawer" :houseFormat="houseFormat"/>
          </div>
          <div class="cells" v-if="entire">
                        <span v-for="(item, list) in house" :key="list">
                            <Room v-for="(room, index) in item.rooms" :key="index" :room="room" :house="item"
                                  class="cell" @view="showDrawer" :houseFormat="houseFormat"/>
                        </span>
          </div>
        </div>
        <!-- 整租 -->
        <div v-if="!tabCard" class="shareHouse ">
          <div style="padding:10px 0 0 10px" class="flexc wrapHouse">
                        <span v-for="(house,lista) in houses" :key="lista">
                            <Room v-for="(room, index) in house.rooms" :key="index" :room="room" :house="house"
                                  class="cell" @view="showDrawer" :houseFormat="houseFormat"/>
                        </span>
          </div>
        </div>
      </div>
      <div v-loading="loading"></div>
    </div>

    <drawer-panel :open.sync="viewRoom">
      <div v-if="viewRoom" class="drawer">
        <Preview :room="currentRoom" :house="currentHouse"/>
      </div>
    </drawer-panel>
    <drawer-panel :open.sync="viewHouse">
      <div v-if="viewHouse" class="drawer">
        <houseInformation :house="currentHouse" :houseType="reqData.houseFormat"/>
      </div>
    </drawer-panel>

  </div>
</template>

<script>
  import _ from 'lodash';
  import fp from 'lodash/fp';
  import {Tab, Room, Search, Preview, houseInformation, DeviceUsageChart} from '~/modules/house';
  import {filterOP} from '../../utils/houseKeeper';

  export default {
    components: {Tab, Room, Search, Preview, houseInformation, DeviceUsageChart},
    data() {
      return {
        houses: [],
        currentRoom: null,
        currentHouse: null,
        viewRoom: false,
        viewHouse: false,
        reqData: {
          houseFormat: 'SHARE',
          size: 200,
          index: 1
        },
        entireHouse: [],
        testArray: [],
        entire: false,
        tabCard: true,
        houseFormat: 'SHARE',
        houseKeeper: null,
        loading: true,
      };
    },
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId;
      },
      listenTabClick() {
        return this.$store.state.userInfo.index
      },
      equipmentHouses: function () {
        return fp.sortBy('[0].currentFloor')(this.houses)
      }
    },
    created() {
      // 减少house页面打开几次在创建时请求几次的错误
      this.$modal.$on('refresh', () => {
        this.formatting()
      });
      this.$root.$on('successRefresh', roomId => {
        this.loading = true;
        this.$set(this, 'houses', this.forceRoomRefresh(this.houses, roomId));
        this.formatting()
      })
    },
    // 监听滚动事件
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
    watch: {
      listenTabClick(newVal, oldVal) {
        let elm = document.getElementsByClassName('main')[0];
        elm.scrollTop = 0
      }
    },
    methods: {
      forceRoomRefresh(houses, roomId) {
        //TODO: clear all houses or only room, revisit this later.
        return roomId ? fp.reject(fp.pipe(fp.get('rooms'), fp.some({id: roomId})))(houses) : houses;
      },
      // 搜索
      keyup(val) {
        this.setSearch(val);
      },
      nameOfHouse(house) {
        if (this.houseFormat === 'ENTIRE') {
          return `${house.location.name}${house.roomNumber}`
        }
        return `${house.location.name} ${house.building}幢 ${house.unit}单元 ${house.roomNumber}室`;
      },
      // 打开电表使用详情
      openDeviceUsageChart(data) {
        this.$modal.$emit('open', {
          comp: DeviceUsageChart,
          data: {
            houseDevice: data,
            title: this.nameOfHouse(data),
          },
          className: 'usage-dialog-wrapper'
        })
      },
      // 滚动事件query
      scrollFunc() {
        let elm = document.getElementsByClassName('main')[0];
        this.loading = false;
        const offset = elm.scrollTop + elm.clientHeight;
        const height = elm.scrollHeight;

        if (offset > height && this.houseFormat !== 'ENTIRE' && (/houses/.test(window.location.pathname))) {
          this.query()
        }
        return
      },
      // 城市选择
      cityArea(data) {
        if (_.isUndefined(data)) {
          delete this.reqData.districtId;
        } else {
          this.reqData.districtId = data.area || data.city;
        }
        this.formatting()
      },
      // 查找 search
      setSearch(data) {
        if (/house/.test(location.pathname)) {
          if (data !== '') {
            this.reqData.q = data;
          } else {
            delete this.reqData.q;
          }
          this.formatting()
        }
      },
      // 小区查找
      communityChange(data) {
        if (data === '0') {
          delete this.reqData.locationId;
        } else {
          this.reqData.locationId = data;
        }
        this.formatting()
      },
      // 房间数查找
      changeRoom(data) {
        if (data !== 0) {
          this.reqData.bedRooms = data;
        } else {
          delete this.reqData.bedRooms;
        }
        this.formatting()
      },
      // 房间状态查找
      changeRoomsStatus(data) {
        this.reqData.status = data;
        this.formatting()
      },
      // 管理员查找
      changeHouseKeeper(data) {
        this.reqData.houseKeeper = data;
        this.formatting()
      },
      // houseFormat查找
      refresh(type, commiunityId) {
        if (/houses/.test(document.location.pathname)) {
          this.reqData.houseFormat = type;
          if (commiunityId !== undefined) {
            this.reqData.locationId = commiunityId;
          } else {
            delete this.reqData.locationId;
          }
          delete this.reqData.districtId;
          this.formatting()
        }
      },
      query(val) {
        this.$model('houses')
          .query(this.reqData, {projectId: this.projectId})
          .then(res => {
            if (this.reqData.houseFormat === 'ENTIRE') {
              this.testArray = [];
              this.entireHouse = [];
              res.data.map((ele, index) => {
                if (!_.includes(this.entireHouse, ele.currentFloor)) {
                  this.entireHouse.push(ele.currentFloor);
                  var newTset = [];
                  newTset.push(ele);
                  this.testArray.push(newTset);
                } else {
                  this.testArray[
                    _.findIndex(this.entireHouse, function (o) {
                      return o == ele.currentFloor;
                    })
                    ].push(ele);
                }
              });
              this.tabCard = true;
              this.entire = true;
              this.$set(this, 'houses', this.testArray)
            } else if (this.reqData.houseFormat === 'SOLE') {
              this.tabCard = false;
              if (val) {
                this.$set(this, 'houses', res.data)
              } else {
                res.data.forEach(element => {
                  this.houses.push(element)
                });
              }
            } else {
              this.entire = false;
              this.tabCard = true;
              if (val) {
                this.$set(this, 'houses', res.data)
              } else {
                res.data.forEach(element => {
                  this.houses.push(element)
                });
              }
            }
            this.houseFormat = this.reqData.houseFormat;
            this.reqData.index++;
            setTimeout(() => {
              this.loading = false
            }, 500)
          })
          .catch(err => {
            console.log('refresh error', err);
          });
        this.$store
          .dispatch('HOUSE_KEEPER', {
            projectId: this.projectId
          })
          .then(data => {
            this.$set(this, 'houseKeeper', filterOP(data));
          });

      },
      showDrawer({room, house}) {
        this.currentRoom = room;
        this.currentHouse = house;
        this.viewRoom = true;
      },
      showHouse(house) {
        this.currentHouse = house;
        this.viewHouse = true;
      },
      suspendHouse(house) {
        this.$message.warning('关闭房源功能暂时未实现。');
      },
      deleteHouse(house) {
        this.$confirm('确认删除该房源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            Promise.all(fp.map(h =>
              this.$model('houses')
                .delete({}, {
                  id: h.houseId,
                  projectId: this.projectId
                }))(fp.flatten([house])))
              .then(res => {
                this.$message.success('删除成功');
                this.formatting();
                this.$root.$emit('successRefresh');
              })
              .catch(e => {
                this.$message('删除失败');
              });
          })
          .catch(e => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      addRoom(data) {
        if(this.houseFormat === 'ENTIRE') {
          this.$message.warning('整栋模式暂时不支持添加房间。');
          return
        }

        this.$model('add_room')
          .create(
            {},
            {projectId: this.projectId, houseId: data.houseId}
          )
          .then(res => {
            this.$message.success('添加成功');
            this.formatting()
          })
          .catch(err => {
          });
      },
      successRefresh() {
        this.formatting()
      },
      // 格式化请求
      formatting() {
        this.reqData.index = 1
        this.query(true);
      }
    }
  };
</script>

<style lang="less" scoped>
  .page-house-index {
    display: flex;

    .main-container {
      flex: 1;
      margin-left: 10px;
      .houseName {
        font-size: 14px;
      }
    }

    .room + .room {
      margin-top: 10px;
    }

    .room {
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 4px #ddd;
      border-radius: 2px;
      color: @dark;
      padding: 20px 20px 0 20px;

      .cells {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        .cell {
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }

  .drawer {
    padding: 0;
  }

  .moreSet {
    position: relative;
    ul {
      position: absolute;
      top: 13px;
      left: -25px;
      width: 60px;
      background: #fff;
      box-shadow: 0 0 1px #ccc;
      display: none;
      overflow: hidden;
      text-align: center;
      z-index: 100;
      li {
        list-style: none;
        margin: 4px 0;
      }
    }
  }

  .moreSet:hover ul {
    display: block;
    li:hover {
      color: #409eff;
    }
  }

  .shareHouse {
    background-color: #fff;
    .wrapHouse {
      flex-wrap: wrap;
      .cell {
        margin: 10px;
      }
    }
  }
</style>
