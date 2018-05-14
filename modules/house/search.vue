<template>
	<div class="search-wrapper">
		<div class="filter">
			<house-status v-model="filters.status" @input='changeRoomsStatus'/>
			<rooms-select v-model="filters.rooms" @input='changeRoomsNum'></rooms-select>
			<el-select v-model="filters.city" clearable placeholder="管理员" size="small" @change='changeHouseKeeper'>
				<el-option v-for="item in houseKeeper" :key="item.id" :label="item.username" :value="item.id"></el-option>
			</el-select>
		</div>
		<div class="actions">
			<!-- <el-button type="warning">
				导出
				<i class="el-icon-sort"></i>
			</el-button> -->
			<!-- <el-dropdown>
                <el-button type="primary">
                    新增
                    <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="create()">房源</el-dropdown-item>
                    <el-dropdown-item @click.native="createContract()">租户</el-dropdown-item>
                    <el-dropdown-item>批量导入</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
		</div>
	</div>
</template>

<script>
	import AddModal from './add';
	import {
		NewContract
	} from '~/modules/contract';

	export default {
		props: {
			houseKeeper:{
				required:true
			}
		},
		data() {
			return {
				filters: {},
				modal: {
					contract: false,
					house: false
				}
			};
		},
		created() {
			this.$modal.$on('refresh', () => {
				this.refresh()
			})
		},
		components: {
			AddModal,
			NewContract
		},
		methods: {
			changeRoomsNum(data) {
				this.$emit('changeRoom', data)
			},
			changeRoomsStatus(data) {
				this.$emit('changeRoomsStatus', data)
			},
			changeHouseKeeper(data) {
				this.$emit('changeHouseKeeper', data)
			},
			addHouse() {
				this.$emit('successRefresh')
			},
			refresh() {
				this.$emit('successRefresh')
			}
		},

	};
</script>

<style lang="less" scoped>
	.search-wrapper {
		margin-bottom: 17px;
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.el-input {
			width: 240px;
		}

		.el-button {
			margin-left: 10px;
		}

		.el-input,
		.el-select {
			margin-right: 10px;
		}
	}
</style>