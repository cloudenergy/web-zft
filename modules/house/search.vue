<template>
    <div class="search-wrapper">
        <div class="filter">
            <el-input placeholder="搜索小区/门牌/电话" prefix-icon="el-icon-search"></el-input>
            <house-status v-model="filters.status" />
            <rooms-select v-model="filters.rooms" @input='changeRoomsNum'></rooms-select>
            <el-select v-model="filters.city" clearable placeholder="管理">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="actions">
            <el-button type="warning">
                导出
                <i class="el-icon-sort"></i>
            </el-button>
            <el-dropdown>
                <el-button type="primary">
                    新增
                    <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="create()">房源</el-dropdown-item>
                    <el-dropdown-item @click.native="createContract()">租户</el-dropdown-item>
                    <el-dropdown-item>批量导入</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import AddModal from './add';
    import { NewContract } from '~/modules/contract';

    export default {
    	data() {
    		return {
    			filters: {},
    			options: [],
    			modal: {
    				contract: false,
    				house: false
    			}
    		};
		},
		created () {
			this.$modal.$on('refresh',()=>{this.refresh()})	
		},
    	components: {
    		AddModal,
    		NewContract
    	},
    	methods: {
    		create(type) {
    			this.$modal.$emit('open', {
    				comp: AddModal,
    				title: '新增房源'
    			});
    		},
    		createContract() {
    			this.modal.contract = true;
    			this.$modal.$emit('open', {
    				comp: NewContract,
    				title: '新增合约'
    			});
			},
			changeRoomsNum(data) {
				this.$emit('changeRoom',data)
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
    	margin-bottom: 20px;
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

