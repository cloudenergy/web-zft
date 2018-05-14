<template>
	<el-table :data="monthFlows" stripe @row-click='handleRowHandle' ref="tableData" class="monthList">
		<el-table-column type="expand" class="cursorp">
                <template slot-scope="props">
                    <div class="housesInLocation">
                       <div v-for="item in props.row.housesInLocation" class="flexc flowMounthLocation" :key="item.id">
                            <div>
                                <span v-if="item.location">{{item.location.location.name}}{{item.location.building}}幢{{item.location.unit}}单元{{item.location.roomNumber}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-01'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-02'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-03'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-04'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-05'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-06'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-07'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-08'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-09'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-10'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-11'])}}</span>
                            </div>
                            <div>
                                <span>{{price(item.months['2018-12'])}}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
		<el-table-column prop="name" label="小区/公寓" width="200">
		</el-table-column>
		<el-table-column prop="2018-01" label="1月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-01'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-02" label="2月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-02'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-03" label="3月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-03'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-04" label="4月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-04'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-05" label="5月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-05'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-06" label="6月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-06'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-07" label="7月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-07'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-08" label="8月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-08'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-09" label="9月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-09'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-10" label="10月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-10'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-11" label="11月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-11'])}}</span>
            </template>
		</el-table-column>
		<el-table-column prop="2018-12" label="12月">
			<template slot-scope="scope">
                <span>{{price(scope.row.months['2018-12'])}}</span>
            </template>
		</el-table-column>
	</el-table>
</template>

<script>
	import _ from 'lodash'
	export default {
		props:{
			monthFlows: {
				type:Array
			},
			reqData: {
				type:Object
			}
		},
		computed: {
			projectId () {
				return this.$store.state.userInfo.user.projectId
			}	
		},
		data() {
			return {
				upflowi:0
			}
		},
		mounted() {

		},
		methods: {
			price(val) {
				return typeof val===Number?(val/100).toFixed(2):val
			},
			handleRowHandle(row) {
				let index = _.indexOf(this.monthFlows, row)
				let houseQuery = this.reqData
				houseQuery.housesInLocation = row.id
				if(row.housesInLocation) {
					if (row.id !== this.upflowi) {
                        this.toggle(row.id)
                        if (this.upflowi !== 0) {
                            this.toggle(this.upflowi)
                            this.upflowi = row.id
                        }
                    } else {
                        this.toggle(row.id)
                    }
				}else {
					this.$model('flow_month')
                        .query(houseQuery, {
                            projectId: this.projectId
                        })
                        .then(res => {
                            this.monthFlows[index].housesInLocation = res
                            // 改造失败
                            res.forEach((ele, num) => {
                                this.$model('housedetail')
                                    .query({
                                        houseFormat: 'SHARE'
                                    }, {
                                        projectId: this.projectId,
                                        id: ele.id
                                    })
                                    .then(data => {
                                        this.$set(this.monthFlows[index].housesInLocation[num],'location', data)
                                        if (num === 0) {
                                            if (row.id !== this.upflowi) {
                                                this.toggle(row.id)
                                                if (this.upflowi !== 0) {
                                                    this.toggle(this.upflowi)
                                                    this.upflowi = row.id
                                                }
                                            } else {
                                                this.toggle(row.id)
                                            }
                                        }
                                    })
                                    .catch(err => {
                                    })
                            })
                        })
                        .catch(err => {
                        });
				}
			},
			toggle(flowi) {
                this.$refs.tableData.toggleRowExpansion(this.monthFlows.find(d => d.id === flowi))
            },
		}
	}
</script>


<style lang="less">
	.monthList .el-table__expanded-cell{
		padding: 20px 0 20px 48px;
		color: #9b9b9b;
        background: #f5f7fa;
        .el-table__row {
            background: #f5f7fa;
        }
        .el-table,
        .el-table__expanded-cell {
            background: #f5f7fa;
        }
	}
</style>

<style lang="less" scoped>
    .housesInLocation>div>div:not(:first-child) {
        flex: 1;
        padding: 0 10px;
        span {
            flex: 1;
        }
	}
	.housesInLocation {
		>div>div:first-child {
			width: 200px;
		}
		.flowMounthLocation{
			line-height: 18px
		}
	}
</style>