<template>
    <div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column prop="type" label="房源">
            </el-table-column>
            <el-table-column label="电" min-width="150">
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
            <el-table-column prop="stype" label="操作">
            </el-table-column>
        </el-table>
        <el-button type="primary" plain @click="batchchange" :disabled="disabledshow" style="margin-top:15px">批量修改</el-button>
        <el-dialog title="xiugai" :visible.sync="dialogVisible" width="30%">
            <set-price :item='homeinfo' ref="childinput"/>
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
    export default {
        components: {
			myIconNum,
			myIconYufu,
            myIconZujin,
            setPrice
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
                // console.log(data)
                // this.setPrice(data)
                this.homeinfo = data
                this.dialogVisible = true;
            },
            batchchange(){
                // this.setPrice(this.multipleSelection)
                this.homeinfo = this.multipleSelection
                this.dialogVisible = true;
            },
            // setPrice(data){
            //     this.$modal.$emit('open', {
			// 			comp: setPrice,
			// 			data: {
			// 				item: data
            //             },
            //             width: '50%',
			// 			title: '修改'
			// 		});
            // }
            notify(){
                this.$refs.childinput.sendchange()
                this.hidden()
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
