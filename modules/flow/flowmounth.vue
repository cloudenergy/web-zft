<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<tenant-way class="marsp marspa" style="margin-left:0px" />
				<ofpayments class="marsp marspa" />
				<mounth class="marsp marspa" />
				<water-source class="marsp marspa" />
				<city-area style="width:220px" class="flexce" />
				<div class="importres">
					<!-- <div class="actions">
						<el-button type="warning" size="mini">
							导出
							<i class="el-icon-sort"></i>
						</el-button>
					</div> -->
					<span class="result-info">32项结果</span>
				</div>
			</el-form>
		</div>
		<flowmounthlist />
	</div>
</template>
<script>
	import flowmounthlist from './flowmounthlist.vue'
	import mounth from './mounth.vue'
	import ofpayments from './ofpayments.vue'
	export default {
		components: {
			flowmounthlist,
			ofpayments,
			mounth
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