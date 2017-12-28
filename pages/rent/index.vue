<template>
	<el-container>
		<div>
			<Tab/>
		</div>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<div class="flexcenter">
						<RentStatus class="status" />
						<RentManager class="manager" />
						<RentSearch class="rentsearchi" v-on:childinfo="showmessage" />
					</div>
					<div class="flexcenter">
						<span class="result-info">32项结果</span>
						<div class="actions">
							<el-button type="warning" size="mini" @click="importrent('rentinfo')">
								导出
								<i class="el-icon-sort"></i>
							</el-button>
						</div>
					</div>
				</div>
			</el-header>
			<el-main>
				<div class="result">
					<DataTable :housesrent='housesrent' class="rentTable" v-loading="loading" @refresh="refresh"/>
				</div>
			</el-main>
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
				housesrent: [],
				loading:true
			};
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
		created() {
    		this.query();
    	},
		methods: {
			query(){
				this.$model('contracts')
				.query({}, {projectId: this.projectId})
				.then((data) =>{
					data.forEach(element => {
						element.toDate = new Date(parseInt(element.to) * 1000).toLocaleDateString().replace(/年|月/g, "-")
						element.fromDate = new Date(parseInt(element.from) * 1000).toLocaleDateString().replace(/年|月/g, "-")
						element.allM = readableDuration(element.to - element.from)
						element.strategy.freq.rentprice = element.strategy.freq.rent/100
						element.strategy.bondprice = element.strategy.bond/100
					});
					this.$set(this, 'housesrent', data);
					var that = this;
					setTimeout(()=>{
						this.loading = false
					},100)
				})
			},
			showmessage(data) {
				console.log(data)
			},
			importrent(mytalbe) {
				
			},
			refresh(){
				this.query()
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.result {
		display: block;
		&:before {
			clear: both;
		}
	}

	.actions {
		// margin-top: 10px;
		margin-left: 10px;
	}
</style>