<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<el-button plain type="info">月</el-button>
				<el-button plain type="info">日</el-button>
				<goend style="margin-left:5px" />
				<tenant-way class="marsp marspa" />
				<ofpayments class="marsp marspa" />
				<water-source class="marsp marspa" />
				<city-area style="width:220px" class="flexce" />
				<div class="importres">
					<div class="actions">
						<el-button type="warning" size="mini">
							导出
							<i class="el-icon-sort"></i>
						</el-button>
					</div>
					<span class="result-info">32项结果</span>
				</div>
			</el-form>
		</div>
		<flowchnnellist />
	</div>
</template>
<script>
	import goend from './goend.vue'
	import flowchnnellist from './flowchnnellist.vue'
	import ofpayments from './ofpayments.vue'
	export default {
		components: {
			flowchnnellist,
			goend,
			ofpayments
		},
		data() {
			return {
				formInline: {
					user: '',
					region: '',
					type: '',
					city: '',
					community: ''
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.flexce {
		align-items: center;
	}

	.marsp {
		margin-right: 5px;
	}

	.marspa {
		margin-left: 5px;
	}

	.minisel {
		width: 100px;
	}

	.importres {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}
</style>