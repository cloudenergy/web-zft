

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
						<div class="flexcenter">
							<RentSearch @childinfo="showmessage" />
							<room-search @input="roomSearch" v-model="info.search"></room-search>
							<rooms-select @input="search" v-model="info.room"></rooms-select>
							<room-manager @input="manager" v-model="info.manager"/>
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
				<equipmentset :houses="houses"/>
			</el-main>
		</el-container>
    </el-container>
</template>

<script>
	import {
		Tab
	} from '~/modules/house';
	import {
		equipmentset
	} from '~/modules/devices'
	import {
		RentSearch
	} from '~/modules/rent'
export default {
	components: {
		Tab,
		RentSearch,
		equipmentset
	},
	data(){
		return{
			houseFormat: 'SHARE',
			info:{
				search:'',
				room:'',
				manager:'',
				
			},
			houses:''
		}
	},
	created() {
    	this.query();
	},
	methods: {
		query() {
    		this.$model('houses')
    			.query({houseFormat: this.houseFormat},{ projectId: this.projectId })
    			.then(res => {
    				this.$set(this, 'houses', res.data || []);
    			});
    		},
		showmessage(data){
			console.log(data)
		},
		search(data){
			console.log(data)
		},
		roomSearch(data){
			console.log(data)
		},
		manager(data){
			console.log(data)
		},
		refresh(type) {
    		this.houseFormat = type;
			this.query()
    		// this.query();
		}
	}
}
</script>

 <style lang="less" scoped>
	.ops-bills {
		// margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
 </style>
 