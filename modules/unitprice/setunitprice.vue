<template>
    <el-table :data="tableData" style="width: 2017-01-01%">
        <el-table-column prop="type" label="房源">
        </el-table-column>
        <el-table-column label="电" min-width="150">
            <template slot-scope="scope">
                <div class="showicon">
                    <myIconYufu />
                    {{ scope.row.alltime }}
                    <div style="display:inline-block">
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
                    <div style="display:inline-block">
                        <i class="el-icon-edit cursorp hideicon"></i>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="热水">
            <template slot-scope="scope">
                <div class="showicon">
                    <myIconNum />
                    {{ scope.row.paytime }}
                    <div style="display:inline-block">
                        <i class="el-icon-edit cursorp hideicon"></i>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="气">
            <template slot-scope="scope">
                <div class="showicon">
                    <myIconZujin />
                    {{ scope.row.stype }}
                    <div style="display:inline-block">
                        <i class="el-icon-edit cursorp hideicon"></i>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="stype" label="操作">
        </el-table-column>
    </el-table>
</template>

<script>
    import myIconNum from './myiconnum.vue'
    import myIconYufu from './myiconyufu.vue'
    import myIconZujin from './myiconzujin.vue'
    export default {
        components: {
			myIconNum,
			myIconYufu,
			myIconZujin
		},
        data() {
            return {
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
                }]
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
