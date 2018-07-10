<template>
  <div class="preview">
    <div class="houseInformationHeader">
      <h3 class="title">{{house.location.name}}{{house.building}}幢{{house.unit}}单元{{house.roomNumber}}</h3>
      <div class="base section">
        <h4>房源信息</h4>
        <p>朝向:
          <span v-for="(item,index) in this.$store.state.userInfo.toward" :key="index"
                v-if="item.EN===house.layout.orientation">{{item.CH}}</span>
        </p>
      </div>
    </div>
    <div class="devices section">
      <h4 class="flexc" style="aline-item:center">
                <span style="line-height:20px;margin-right:15px">
                    智能设备
                </span>
        <i class="el-icon-circle-plus-outline" style="font-size:20px;color:#409eff" @click="bindEleciricity"></i>
      </h4>
      <el-table :data="house.devices" stripe>
        <el-table-column label="ID" width="150">
          <template slot-scope="scope">
            <span>{{removePrefix(scope.row.deviceId)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="设备备注" min-width="200">
        </el-table-column>
        <el-table-column label="通讯状态" width="100">
          <template slot-scope="scope">
            <span>{{statusIndicator(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理" max-width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h4 class="flexc" style="aline-item:center">
                <span class="sharing-title">
                    分摊信息
                </span>
      </h4>
      <div class="roomDevices" v-loading="loading">
          <el-table :data="this.sharingRooms" style="width: 100%" stripe>
            <el-table-column label="房间">
              <template slot-scope="scope">
                <span style="margin-left: 10px">房间{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="住户姓名">
              <template slot-scope="scope">
                <span>{{scope.row.contract.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="登陆账号">
              <template slot-scope="scope">
                <span>{{scope.row.username}}</span>
              </template>
            </el-table-column>
            <el-table-column label="分摊比例">
              <template slot-scope="scope">
                <div v-if="onlyOneSharingContract()">
                  <el-input-number style="width:100px" :disabled="true"
                                   :controls="false" value="100">
                  </el-input-number>
                  %
                </div>
                <div v-if="multipleContracts()">
                  <el-input-number style="width:100px"
                                   v-model="scope.row.share.value"
                                   v-if="scope.row.share"
                                   :persicion="0" :max="100" :min="1"
                                   :controls="false" @input="share(scope.row)">
                  </el-input-number>
                  <el-input-number style="width:100px"
                                   v-if="!scope.row.share"
                                   :disabled="true"
                                   :controls="false" value="0">
                  </el-input-number>
                  %
                </div>
              </template>
            </el-table-column>
          </el-table>

        <el-button @click.native="saveSharing" type="primary" style="margin-top:30px;">保存</el-button>
      </div>
    </div>
    <el-dialog title="选择要绑定的智能设备" :visible.sync="dialogVisible" width="40%" append-to-body>
      <conversion ref="aaa" @setEquipmentid="setEquipmentid"/>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choosechange()">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="设置分摊方式" :visible.sync="visibility" width="40%" append-to-body>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visibility = false">取 消</el-button>
                <el-button type="primary" @click="visibility = false">确 定</el-button>
            </span>
    </el-dialog>

  </div>
</template>

<script>
  import {removePrefix} from '~/utils/helper';
  import conversion from '../devices/conversion.vue';
  import fp from 'lodash/fp';

  export default {
    props: {
      house: Object,
      houseType: String
    },
    data() {
      return {
        dialogVisible: false,
        value4: true,
        apportionment: [],
        visibility: false,
        loading: true,
        sharingRooms: []
      };
    },
    components: {
      conversion
    },
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId;
      }
    },
    created() {
      this.query();
    },
    methods: {
      onlyOneSharingContract() {
        return this.apportionment.length === 1;
      },
      multipleContracts() {
        return this.apportionment.length > 1;
      },
      removePrefix(val) {
        return removePrefix(val);
      },
      query() {
        this.$model('apportionment')
          .query(
            {},
            {
              projectId: this.projectId,
              id: this.house.houseId
            }
          )
          .then(res => {
            this.$set(this, 'apportionment', res);
            const sharingMap = fp.groupBy('roomId')(res);
            const rooms = fp.filter(this.showRoom)(fp.map(room => fp.defaults(room)({
              share: fp.head(fp.getOr([{value: 0}])(room.id)(sharingMap))
            }))(this.house.rooms));
            this.$set(this, 'sharingRooms', fp.sortBy(['name'])(rooms));
            fp.each(this.queryUsername.bind(this))(this.sharingRooms);
            this.loading = false;
          });
      },
      showRoom(room) {
        return fp.getOr(0)('share.value')(room) > 0
      },
      queryUsername(room) {
        this.$model('room_contracts')
          .query({}, {
            projectId: this.projectId,
            roomId: room.id
          })
          .then(res => {
            const current = fp.defaults({username: fp.get('data[0].user.accountName')(res)})(fp.find(fp.pipe(fp.get('id'), fp.eq(room.id)))(this.sharingRooms));
            this.$set(this, 'sharingRooms', fp.sortBy(['name'])(fp.concat(fp.reject(fp.pipe(fp.get('id'), fp.eq(room.id)))(this.sharingRooms), current)))
          })
          .catch(err => {
          });
      },
      share(val) {
        const newSharing = this.apportionment.map(sharing => {
          return sharing.roomId === val.share.roomId ?
            fp.defaults(sharing)({value: Number(val.share.value)})
            : sharing;
        });
        this.$set(this, 'apportionment', newSharing);
      },
      saveSharing() {
        if (fp.sumBy('value')(this.apportionment) === 100) {
          this.$model('apportionment_put')
            .update(this.apportionment, {
              projectId: this.projectId,
              houseId: this.house.houseId,
              id: 'apportionment'
            })
            .then(() => {
              this.$message.success('分摊比例更新成功');
              this.query();
            })
            .catch(err => {
              console.error('分摊更新失败', err);
              this.$message('分摊更新失败');
              this.query();
            });
        } else {
          this.$message('比例和不为100%，请重新输入');
        }
      },
      // 删除house电表
      handleDelete(data) {
        this.$confirm(`此操作将解绑电表${removePrefix(data.deviceId)}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$model('house_devices')
              .delete({},
                {
                  projectId: this.projectId,
                  houseId: this.house.houseId,
                  id: data.deviceId
                }
              )
              .then(() => {
                this.queryAgain();
              })
              .catch(err => {
                console.log(err);
                this.$message('解绑失败');
              });
          })
          .catch(err => {});
      },
      bindEleciricity() {
        this.dialogVisible = true;
      },
      // 房源绑定电表
      setEquipmentid(data) {
        this.$model('house_devices')
          .update(
            {
              public: '1'
            },
            {
              projectId: this.projectId,
              houseId: this.house.houseId,
              id: data
            }
          )
          .then(data => {
            this.$refs.aaa.setNewList();
            this.queryAgain('bind');
          })
          .catch(err => {
            this.$message.mistake('绑定失败');
          });
      },
      choosechange() {
        this.chooseElectricity();
      },
      chooseElectricity() {
        this.$confirm('此操作将选择此电表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$refs.aaa.changeelectricity(this.houseId);
            this.dialogVisible = false;
            this.$refs.aaa.log();
          })
          .catch(err => {
          });
      },
      queryAgain(data) {
        this.$model('housedetail')
          .query(
            {
              houseFormat: this.houseType
            },
            {
              projectId: this.projectId,
              id: this.house.houseId
            }
          )
          .then(res => {
            this.$set(this.house, 'devices', res.devices);
          })
          .catch(err => {
          });
      },
      statusIndicator(status) {
        return status.service === 'EMC_ONLINE' ? '在线' : '离线';
      }
    }
  };
</script>

<style lang="less" scoped>
  .sharing-title {
    margin-top: 30px;
    line-height:20px;
    margin-right:15px
  }
  .houseInformationHeader {
    padding: 20px;
    background-color: #f5f7fa;
  }

  .base {
    margin-top: 20px;
  }

  .section {
    padding: 20px;
    h4 {
      margin-bottom: 20px;
    }
  }

  .setPrice {
    .title {
      width: 80px;
      font-size: 14px;
      line-height: 28px;
    }
    .centerRoom {
      flex: 1;
      span {
        display: inline-block;
        width: 80px;
        line-height: 28px;
      }
    }
    .write {
      width: 102px;
      padding: 0 10px;
      font-size: 20px;
      line-height: 28px;
    }
  }
</style>
