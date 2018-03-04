<template>
    <div class="preview">
        <h3 class="title">{{house.location.name}}{{house.building}}幢{{house.unit}}单元{{house.roomNumber}}</h3>
        <div class="base section">
            <h4>房源信息</h4>
            <p>朝向:<span v-for="(item,index) in this.$store.state.userInfo.toward" :key="index" v-if="item.EN===house.layout.orientation">{{item.CH}}</span></p>
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
        </div>
        <!-- TODO ZHOUYI 分摊有问题，暂时下线 -->
        <!-- <div class="flexc setPrice">
            <span class="title">电费分摊</span>
            <div class="centerRoom">
                <span v-for="item in apportionment" :key="item.value">房间{{item.room.name}}:{{item.value}}%</span>
            </div>
            <div class="write">
                <i class="el-icon-edit-outline" @click="writePercent"></i>
            </div>
        </div> -->
        <div>
            <el-button @click.native="del" type="danger" style="margin-top:1px;">删除此房源</el-button>
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
                apportionment:[],
                visibility:false
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
            query() {
                this.$model('apportionment')
                .query({},{projectId:this.projectId,id:this.house.houseId})
                .then(res=>{
                    this.$set(this,'apportionment',res)
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
                            this.queryAgain('unbundling')
                        })
                }).catch(err => {

                });
            },
            bindEleciricity() {
                this.dialogVisible = true
            },
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
            queryAgain(data) {
                this.$model('housedetail')
                    .query({
                        houseFormat: this.houseType
                    }, {
                        projectId: this.projectId,
                        id: this.house.houseId
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        }
    };
</script>

<style lang="less" scoped>
    .section {
        margin-bottom: 30px;

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
</style>