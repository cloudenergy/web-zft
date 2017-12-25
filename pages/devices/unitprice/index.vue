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
					<div class="flexcenter searchset">
						<RentSearch @childinfo="showmessage" class="setsearch"/>
						<myIconYufu style="margin-left:20px"/><span class="myiconintroduce">预付费</span>
						<myIconZujin/><span class="myiconintroduce">随租金付</span>
						<myIconNum/><span class="myiconintroduce">1号付费，其他数字以此类推</span>
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
				<setUnitPrice :homePrice="houses" @refresh="choose_refresh"/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		RentSearch
	} from '../../../modules/rent'
	import {
		setUnitPrice,
		myIconNum,
		myIconYufu,
		myIconZujin
	} from '../../../modules/unitprice'
	export default {
		components: {
			Tab,
			RentSearch,
			setUnitPrice,
			myIconNum,
			myIconYufu,
			myIconZujin
		},
		data() {
			return {
				houseFormat: 'SHARE',
				houses:[]
			};
		},
		created() {
    		this.query();
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
		methods:{
			refresh(type) {
    			this.houseFormat = type;
    			this.query();
			},
			choose_refresh(){
				this.query()
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
	.myiconintroduce{
		margin-right: 30px;
		font-weight: 350;
	}
 </style>
 <style>
	.searchset .nonemargin{
		margin-left: 0
	}
 </style>
 
 