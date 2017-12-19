<template>
	<el-container>
		<el-aside class="page-bill-index" width="auto">
			<div>
				<Tab/>
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
				<electricit/>
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
		coldwater
	} from '../../modules/devices'
	import {
		RentSearch
	} from '../../modules/rent'
	export default {
		components: {
			Tab,
			deviceModules,
			RentSearch,
			electricit,
			coldwater
		},
		data() {
			return {
				
			};
		},
		methods:{
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
 