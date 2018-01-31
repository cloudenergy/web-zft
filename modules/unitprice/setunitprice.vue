<template>
    <div>
        <el-table :data="equipmentHouses" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="房源">
                <template slot-scope="scope">
                    <div>
                        <span>{{scope.row.location.name}}</span>
                        <span>{{scope.row.building}}</span>
                        <span>{{scope.row.unit}}</span>
                        <span>{{scope.row.roomNumber}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="电">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconYufu /> {{price(scope.row.electricity[0].price)}}
                        <div style="display:inline-block" @click="setElectricit(scope.row)">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="冷水">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconNum /> {{ scope.row.agoread }}
                        <!-- <div style="display:inline-block">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="热水">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconNum /> {{ scope.row.paytime }}
                        <!-- <div style="display:inline-block">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="燃气">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconZujin /> {{ scope.row.stype }}
                        <!-- <div style="display:inline-block">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="stype" label="操作"> -->
            <!-- </el-table-column> -->
        </el-table>
        <!-- @@@暂时下线 -->
        <el-button type="primary" plain @click="batchChange" :disabled="disabledShow" style="margin-top:15px">批量修改</el-button>
        <el-dialog title="单价设置" :visible.sync="dialogVisible" width="30%">
            <set-price :item='homeinfo' ref="childinput" @notclose='notclose' />
            <div slot="footer" class="dialog-footer">
                <el-button @click="hidden()">取 消</el-button>
                <el-button type="primary" @click="notify()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myIconNum from './myiconnum.vue'
    import myIconYufu from './myiconyufu.vue'
    import myIconZujin from './myiconzujin.vue'
    import setPrice from './setprice.vue'
    import {
        success_message
    } from '~/utils/date'
    import _ from 'lodash'
    export default {
        components: {
            myIconNum,
            myIconYufu,
            myIconZujin,
            setPrice
        },
        props: {
            homePrice: {
                type: Array
            },
            countInfo: {
                type: Object
            }
        },
        data() {
            return {
                dialogVisible: false,
                disabledShow: true,
                tableData: [],
                multipleSelection: [],
                homeinfo: '',
                showPrice: false,
                selectHouse: [],
                volumeSet:false
            }
        },
        computed: {
            projectId() {
                return this.$store.state.user.projectId;
            },
            equipmentHouses: function () {
                return this.homePrice.map((element, index) => {
                    if (element.prices.length !== 0) {
                        element.electricity = []
                        element.prices.map((item, list) => {
                            if (item.type === 'ELECTRIC') {
                                element.electricity.push(item)
                            }
                        })
                    } else {
                        element.electricity = []
                        element.electricity.push({
                            price: '未设置',
                            type: 'ELECTRIC'
                        })
                    }
                    return element
                })
            }
        },
        methods: {
            price(data) {
                if (isNaN(data)) {
                    return '未设置'
                } else {
                    return data / 100
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (val != '') {
                    this.disabledShow = false;
                } else {
                    this.disabledShow = true
                }
            },
            setElectricit(data) {
                console.log(data)
                this.homeinfo = data
                this.dialogVisible = true;
                this.volumeSet = false
            },
            batchChange() {
                this.dialogVisible = true;
                this.selectHouse = this.multipleSelection.map(ele => {
                    return ele.houseId
                })
                this.homeinfo = this.multipleSelection[0]
                this.volumeSet = true
            },
            notify() {
                this.$refs.childinput.sendchange()
            },
            notclose(data) {
                this.hidden()
                if (this.volumeSet) {
                    let a = this.$model('volume_set')
                        .update({
                            category: this.homeinfo.electricity[0].category,
                            price: data,
                            houseIds: this.selectHouse
                        }, {
                            projectId: this.projectId,
                            id: 'ELECTRIC',
                            houseId: this.homeinfo.houseId
                        })
                        .then(res => {
                            return data
                        })
                    let b = this.$model('volume_set')
                        .update({
                            category: this.homeinfo.electricity[1].category,
                            price: data,
                            houseIds: this.selectHouse
                        }, {
                            projectId: this.projectId,
                            id: 'ELECTRIC',
                            houseId: this.homeinfo.houseId
                        })
                        .then(res => {
                            return data
                        })
                    Promise.all([a, b]).then(res => {
                        this.$emit('refresh')
                        this.$message.success('修改成功')
                    })
                } else {
                    this.homeinfo.electricity.forEach((element,index) => {
                        index = this.$model('set_electric_price')
                            .update({
                                category: element.category,
                                price: data
                            }, {
                                projectId: this.projectId,
                                id: 'ELECTRIC',
                                houseId: this.homeinfo.houseId
                            })
                            .then(res => {
                                return data
                            })
                            Promise.all([index]).then(res => {
                            this.$emit('refresh')
                            this.$message.success('修改成功')
                    })
                    });
                      
                    
                }
            },
            setAllElectricit() {

            },
            hidden() {
                this.dialogVisible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .hideicon {
        display: none;
    }

    .showicon {
        &:hover {
            .hideicon {
                display: block;
            }
        }
    }
</style>