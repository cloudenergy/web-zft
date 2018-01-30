<template>
	<div>
		<div class="block" style="margin-bottom:10px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
				<goend/>
				<tenant-way class="marsp marspa" />
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
		<flowsubjectlist/>
	</div>
</template>
<script>
	import flowsubjectlist from './flowsubjectlist.vue'
	import goend from './goend.vue'
	export default {
		components: {
			flowsubjectlist,
			goend,
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
	.importres {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.flexce {
		align-items: center;
	}

	.minisel {
		width: 100px;
	}

	.marsp {
		margin-right: 5px;
	}

	.marspa {
		margin-left: 5px;
	}
</style>