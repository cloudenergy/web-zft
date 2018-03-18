<template>
    <div class="preview">
        <div class="houseInformationHeader">
            <h3 class="title">{{house.location.name}}{{house.building}}幢{{house.unit}}单元{{house.roomNumber}}</h3>
            <div class="base section">
                <h4>房源信息</h4>
                <p>朝向:
                    <span v-for="(item,index) in this.$store.state.userInfo.toward" :key="index" v-if="item.EN===house.layout.orientation">{{item.CH}}</span>
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
                <el-table-column prop="deviceId" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="title" label="设备备注" min-width="200">
                </el-table-column>
                <el-table-column label="通讯状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status.service==='EMC_ONLINE'">在线</span>
                        <span v-if="scope.row.status.service==='EMC_OFFLINE'">离线</span>
                    </template>
                </el-table-column>
                <el-table-column label="管理" max-width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <h4 class="flexc" style="aline-item:center">
                <span style="line-height:20px;margin-right:15px">
                    房间设备
                </span>
            </h4>
            <div class="roomDevices">
                <div v-for="item in this.house.rooms" :key='item.id'>
                    <el-table :data="item.devices" style="width: 100%">
                        <el-table-column label="房间号">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">房间{{ item.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="电表id">
                            <template slot-scope="scope">
                                <span>{{delDeviceYTL(scope.row.deviceId)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleRoomDelete(item.id, scope.row.deviceId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-button @click.native="del" type="danger" style="margin-top:30px;">删除此房源</el-button>
        </div>
        <el-dialog title="选择要绑定的智能设备" :visible.sync="dialogVisible" width="40%" append-to-body>
            <conversion ref="aaa" @setEquipmentid="setEquipmentid" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choosechange()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- <el-dialog title="设置分摊方式" :visible.sync="visibility" width="40%" append-to-body>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visibility = false">取 消</el-button>
                <el-button type="primary" @click="visibility = false">确 定</el-button>
            </span>
        </el-dialog> -->

    </div>
</template>

<script>
    import {
        delYTL
    } from '~/utils/helper';
    import conversion from '../devices/conversion.vue'
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
                visibility: false
            }
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
            this.query()
        },
        methods: {
            delDeviceYTL(val) {
                return delYTL(val)
            },
            query() {
                this.$model('apportionment')
                    .query({}, {
                        projectId: this.projectId,
                        id: this.house.houseId
                    })
                    .then(res => {
                        this.$set(this, 'apportionment', res)
                    })
            },
            writePercent() {
                this.visibility = true;
            },
            del(room) {
                this.$model('rooms').delete(null, {
                    id: this.roomId
                });
            },
            // 删除house电表
            handleDelete(data) {
                this.$confirm('此操作将解绑此电表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$model('house_devices')
                        .delete({}, {
                            projectId: this.projectId,
                            houseId: this.house.houseId,
                            id: data.deviceId
                        })
                        .then((res) => {
                            this.queryAgain()
                        })
                        .catch(err => {
                            this.$message('解绑失败')
                        })
                }).catch(err => {

                });
            },
            // 删除room电表
            handleRoomDelete(data, val) {
                this.$confirm('此操作将解绑此电表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$model('room_devices')
                        .delete({}, {
                            projectId: this.projectId,
                            houseId: this.house.houseId,
                            roomId: this.data,
                            id: val
                        })
                        .then((res) => {
                            this.queryAgain('unbundling')
                        })
                }).catch(err => {
                    this.$message('取消解绑')
                });
            },
            bindEleciricity() {
                this.dialogVisible = true
            },
            // 房源绑定电表
            setEquipmentid(data) {
                this.$model('house_devices')
                    .update({
                        public: '1'
                    }, {
                        projectId: this.projectId,
                        houseId: this.house.houseId,
                        id: data
                    })
                    .then((data) => {
                        this.$refs.aaa.setNewList()
                        this.queryAgain('bind')
                    })
                    .catch(err => {
                        this.$message.mistake('绑定失败')
                    })
            },
            choosechange() {
                this.chooseElectricity()
            },
            chooseElectricity() {
                this.$confirm('此操作将选择此电表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.aaa.changeelectricity(this.houseId)
                    this.dialogVisible = false
                    this.$refs.aaa.log()
                }).catch(err => {

                });
            },
            // TODO ZHOUYI res缺少devices
            queryAgain(data) {
                this.$model('housedetail')
                    .query({
                        houseFormat: this.houseType
                    }, {
                        projectId: this.projectId,
                        id: this.house.houseId
                    })
                    .then(res => {
                        this.$set(this.house, 'devices', res.devices)
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        }
    };
</script>

<style lang="less" scoped>
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
<style>
    .el-switch {
        height: 22px;
    }
    .roomDevices .el-table__header-wrapper {
        display: none;
    }
</style>