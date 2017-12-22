<template>
	<el-container>
		<!-- <el-aside class="page-bill-index" width="auto">
			<div>
				<Tab/>
			</div>
		</el-aside>
		<el-container>
			<el-header style="height:auto">
				<div class="ops-bills">
					<div class="flexcenter">
						<div class="flexcenter">
							<deviceModules @showthat="showwhat" :form="devicesstatus" />
							<deviceModules @showthat="showelec" v-if="devicesstate=='all1'" :form="electricitystatus" />
							<deviceModules @showthat="showcold" v-if="devicesstate=='all2'" :form="coldwater" />
							<deviceModules @showthat="showhotw" v-if="devicesstate=='all3'" :form="hotwater" />
							<deviceModules @showthat="shownatu" v-if="devicesstate=='all4'" :form="naturalgas" />
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
				<electrictwater/>
			</el-main>
		</el-container> -->
		<div class="loaDing"><img src="http://bpic.588ku.com/element_origin_min_pic/04/09/51/6857e2a37aa17e0.jpg" alt=""></div>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		deviceModules,
		electrictwater,
	} from '~/modules/devices'
	import {
		RentSearch
	} from '~/modules/rent'
	export default {
		components: {
			Tab,
			deviceModules,
			RentSearch,
			electrictwater,
		},
		data() {
			return {
				devicesstate:'all1',
				devicesstatus: [{
						index: 'all1',
						text: '电'
					},
					{
						index: 'all2',
						text: '冷水'
					},
					{
						index: 'all3',
						text: '热水'
					},
					{
						index: 'all4',
						text: '燃气'
					}
				],
				electricitystatus: [{
						index: '11',
						text: '全部'
					},
					{
						index: '22',
						text: '已配置'
					},
					{
						index: '33',
						text: '未配置'
					}
				],
				coldwater: [{
						index: '111',
						text: '全部'
					},
					{
						index: '222',
						text: '已超'
					},
					{
						index: '333',
						text: '本月未抄'
					},
				],
				hotwater: [{
						index: '1111',
						text: '全部'
					},
					{
						index: '2222',
						text: '已超'
					},
					{
						index: '3333',
						text: '本月未抄'
					},
				],
				naturalgas: [{
						index: '11111',
						text: '全部'
					},
					{
						index: '22222',
						text: '已超'
					},
					{
						index: '33333',
						text: '本月未抄'
					},
				]
			};
		},
		methods:{
      showwhat(data){
				this.devicesstate = data;
			},
			showelec(data){
				console.log(data)
			},
			showcold(data){
				console.log(data)
			},
			showhotw(data){
				console.log(data)
			},
			shownatu(data){
				console.log(data)
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
	.loaDing{
		margin: 200px auto
	}
 </style>
 