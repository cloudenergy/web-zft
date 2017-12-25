<template>
    <div>
        <el-table :data="homePrice" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column label="房源">
                <template slot-scope="scope">
                    <div>
                        <span>{{scope.row.group}}</span>
                        <span>{{scope.row.building}}</span>
                        <span>{{scope.row.unit}}</span>
                        <span>{{scope.row.roomNumber}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="电">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconYufu />
                        {{ scope.row.alltime }}
                        <div style="display:inline-block" @click="setElectricit(scope.row)">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="冷水">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconNum />
                        {{ scope.row.agoread }}
                        <!-- <div style="display:inline-block">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="热水">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconNum />
                        {{ scope.row.paytime }}
                        <!-- <div style="display:inline-block">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="燃气">
                <template slot-scope="scope">
                    <div class="showicon">
                        <myIconZujin />
                        {{ scope.row.stype }}
                        <!-- <div style="display:inline-block">
                            <i class="el-icon-edit cursorp hideicon"></i>
                        </div> -->
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="stype" label="操作"> -->
            <!-- </el-table-column> -->
        </el-table>
        <el-button type="primary" plain @click="batchchange" :disabled="disabledshow" style="margin-top:15px">批量修改</el-button>
        <el-dialog title="xiugai" :visible.sync="dialogVisible" width="30%">
            <set-price :item='homeinfo' ref="childinput" @notclose='notclose'/>
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
    import {success_message} from '~/utils/date'
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
            }
        },
        data() {
            return {
                dialogVisible:false,
                disabledshow:true,
                tableData: [{
                    type: 'NO.2',
                    stype: '已完成',
                    alltime: '2017-01-01——2-02',
                    agoread: '10000',
                    paytime: '2017-01-01'
                }, {
                    type: 'NO.4',
                    stype: '已完成',
                    alltime: '2017-01-01—02-02',
                    agoread: '10',
                    paytime: '2017-01-01'
                }, {
                    type: 'NO.1',
                    stype: '已完成',
                    alltime: '2017-01-01——02-02',
                    agoread: '10',
                    paytime: '2017-01-01'
                }, {
                    type: 'NO.3',
                    stype: '已完成',
                    alltime: '2017-01-0102-02',
                    agoread: '10',
                    paytime: '2017-01-01'
                }],
                multipleSelection: [],
                homeinfo: ''
            }
        },
        computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(val!=''){
                    this.disabledshow = false;
                }else{
                    this.disabledshow = true
                }
                console.log(this.multipleSelection)
            },
            setElectricit(data){
                this.homeinfo = data
                this.dialogVisible = true;
            },
            batchchange(){
                // this.setPrice(this.multipleSelection)
                this.homeinfo = this.multipleSelection
                this.dialogVisible = true;
            },
            notify(){
                this.$refs.childinput.sendchange()
            },
            notclose(data){
                if(data==undefined){
                    alert('输入价格为空或者不是数字，请重新输入')
                }else{
                    console.log(data.houseId)
                    console.log(data)
                    this.$model('set_electric_price')
                    .update (data.prices,{projectId: this.projectId,id:data.houseId})
                    .then(data=>{
                        this.hidden()
                        this.$emit('refresh')
                        this.$message.success('修改成功')
                    }).catch(()=>{
                        this.$message.error('修改失败')
                    })
                }
            },
            hidden(){
                this.dialogVisible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .hideicon{
        display: none;
    }
    .showicon{
        &:hover{
            .hideicon{
                display: block;
            }
        }
    }
</style>
