<template>
	<el-container>
		<div class="loaDing">敬请期待</div>
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
		margin: 200px auto;font-size: 50px

	}
 </style>
 