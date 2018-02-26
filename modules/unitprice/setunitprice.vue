<template>
    <div>
        <el-table :data="equipmentHouses" style="width: 100%" @selection-change="handleSelectionChange" v-if="!copyHouseExtra">
            <el-table-column type="" width="20">
            </el-table-column>
            <el-table-column label="房源" width="300">
                <template slot-scope="scope">
                    <div>
                        <span>{{scope.row.location.name}}</span>
                        <span>{{scope.row.building}}</span>
                        <span>{{scope.row.unit}}</span>
                        <span>{{scope.row.roomNumber}}</span>
                        <span v-if="houseFormat==='SHARE'&&scope.row.name===undefined">公区</span>
                        <span v-if="houseFormat==='SHARE'&&scope.row.name!==undefined">{{scope.row.name}}</span>
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
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <div class="showicon cursorp" @click="copyExtra(scope.row)">
                        <span v-if="scope.row.electricity[0].price!=='未设置'">复制到</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- @@@暂时下线 -->
        <div class="copyHouseExtra" v-if="copyHouseExtra">
            <copyExtra :data="equipmentHouses" @refresh="copyCost" />
        </div>

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
    import copyExtra from './copyExtra.vue'
    import {
        success_message
    } from '~/utils/date'
    import _ from 'lodash'
    export default {
        components: {
            myIconNum,
            myIconYufu,
            myIconZujin,
            setPrice,
            copyExtra
        },
        props: {
            homePrice: {
                type: Array
            },
            countInfo: {
                type: Object
            },
            houseFormat: {
                type:String
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
                volumeSet: false,
                copyExtraElectric: null,
                copyHouseExtra: false
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId;
            },
            equipmentHouses: function () {
                while(this.houseFormat==='SHARE'){
                    return _.flatten(this.homePrice.map((element, index) => {
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
                        function Foo() {
                            this.houseId = element.houseId
                            this.electricity = element.electricity
                            this.location = element.location
                            this.roomNumber = element.roomNumber
                            this.building = element.building
                            this.unit = element.unit
                        }
                        return (_.flatten(_.concat(element,_.pick(element,['rooms']).rooms).map(ele=>{
                            return _.assignIn( ele , new Foo)
                        })))
                    }))
                }
                while(this.houseFormat!=='SHARE'){ 
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
            }
        },
        methods: {
            copyCost(data) {
                if (data !== undefined) {
                    let a = this.$model('volume_set')
                        .update({
                            category: this.copyExtraElectric[0].category,
                            price: this.copyExtraElectric[0].price,
                            houseIds: data
                        }, {
                            projectId: this.projectId,
                            id: 'ELECTRIC'
                        })
                        .then(res => {
                            return data
                        })
                    let b = this.$model('volume_set')
                        .update({
                            category: this.copyExtraElectric[1].category,
                            price: this.copyExtraElectric[0].price,
                            houseIds: data
                        }, {
                            projectId: this.projectId,
                            id: 'ELECTRIC'
                        })
                        .then(res => {
                            return data
                        })
                    Promise.all([a, b]).then(res => {
                        this.$emit('refresh')
                        this.$message.success('修改成功')
                    })
                }
                this.copyHouseExtra = !this.copyHouseExtra
                this.$emit('copyStatusChange', this.copyHouseExtra)
            },
            copyExtra(data) {
                this.copyExtraElectric = data.electricity
                this.copyHouseExtra = !this.copyHouseExtra
                this.$emit('copyStatusChange', this.copyHouseExtra)
            },
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
                this.homeinfo = data
                this.dialogVisible = true;
                this.volumeSet = false
            },
            notify() {
                this.$refs.childinput.sendchange()
            },
            notclose(data) {
                this.hidden()
                if (this.volumeSet) {

                } else {
                    this.homeinfo.electricity.forEach((element, index) => {
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

    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }

        to {
            opacity: 1;
            transform: none;
        }
    }

    /*添加动画*/

    .copyHouseExtra {
        animation: fadeInLeft .4s ease;
    }
</style>