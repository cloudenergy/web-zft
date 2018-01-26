<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab @change="refresh" :selected="houseFormat"/>
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<div class="flexcenter">
						<div style="margin-left:-20px">
							<RentSearch @childinfo="showmessage" />
						</div>
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
				<electricit :houses="houses"/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		deviceModules,
		electricit,
	} from '../../modules/devices'
	import {
		RentSearch
	} from '../../modules/rent'
	export default {
		components: {
			Tab,
			deviceModules,
			RentSearch,
			electricit
		},
		data() {
			return {
				houseFormat: 'SHARE',
				houses:[]
			};
		},
		computed : {
			projectId(){
				return this.$store.state.user.projectId;
			}	
		},
		methods:{
			refresh(type) {
    			this.houseFormat = type;
    			this.query();
			},
			query() {
    			this.$model('houses')
    				.query(
    					{houseFormat: this.houseFormat},{ projectId: this.projectId }
    				)
    				.then(res => {
    					this.$set(this, 'houses', res.data || []);
					});
    		},
			showmessage(data){
				console.log(data)
			}
		}
	};
</script>
 <style lang="less" scoped>
	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

 </style>
 