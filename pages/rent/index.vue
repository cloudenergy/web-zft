<template>
	<el-container>
		<div>
			<Tab @change="refresh" :selected="houseFormat"/>
		</div>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<div class="flexcenter">
						<RentStatus class="status" />
						<RentManager class="manager" />
					</div>
					<div class="flexcenter">
						<span class="result-info">30项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>
				</div><search-all :title="'搜索姓名/电话'"></search-all>
			</el-header>
			
			<div class="result">
				<DataTable v-if="housesRent" :housesrentData='housesRent' class="rentTable" v-loading="!housesRent" @refresh="refresh"/>
			</div>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		RentStatus,
		DataTable,
		RentManager,
		RentSearch
	} from '~/modules/rent';
	import {readableDuration} from '../../utils/date.js'
	export default {
		components: {
			Tab,
			RentStatus,
			RentManager,
			DataTable,
			RentSearch
		},
		data() {
			return {
				housesRent: null,
				houseFormat:'SHARE'
			};
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
		created() {
    		// this.query();
    	},
		methods: {
			refresh(type) {
				if(type!==undefined){
					this.houseFormat = type;
				}
				this.query()
			},
			query(){
				this.$model('contracts')
				.query({houseFormat:this.houseFormat,size:'20'}, {projectId: this.projectId})
				.then((data) =>{
					data.data.forEach(element => {
						element.toDate = new Date(parseInt(element.to) * 1000).toLocaleDateString().replace(/年|月/g, "-")
						element.fromDate = new Date(parseInt(element.from) * 1000).toLocaleDateString().replace(/年|月/g, "-")
						element.allM = readableDuration(element.to - element.from)
						element.strategy.freq.rentprice = element.strategy.freq.rent/100
						element.strategy.bondprice = element.strategy.bond/100
					});
					this.$set(this, 'housesRent', data);
				})
			},
			showmessage(data) {
				console.log(data)
			},
			importrent(mytalbe) {

			}
		}
	};
</script>

<style lang="less" scoped>
	.page-bill-index {
		display: flex;
		min-width: 275px;
	}

	.ops-bills {
		// margin-bottom: 20px;
		height: 54px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result {
		margin: 0 20px;
		display: block;
		&:before {
			clear: both;
		}
	}

	.actions {
		// margin-top: 10px;
		margin-left: 10px;
	}
	.manager{
		margin-bottom: 11px;
	}
</style>