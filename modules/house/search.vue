<template>
    <div class="search-wrapper">
        <div class="filter">
            <el-input placeholder="搜索小区/门牌/电话" prefix-icon="el-icon-search" size="mini"></el-input>
            <el-select v-model="filters.city" size="mini" clearable placeholder="房源状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="filters.city" size="mini" clearable placeholder="居室">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="filters.city" size="mini" clearable placeholder="管理">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="actions">
            <el-button type="warning" size="mini">
                导出
                <i class="el-icon-sort"></i>
            </el-button>
            <el-dropdown>
                <el-button type="primary" size="mini">
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
        <add-modal :visible.sync="show_new_house_modal" />
        <new-contract :visible.sync="show_new_contract_modal" />
    </div>
</template>

<script>
    import AddModal from './add';
    import { NewContract } from '~/modules/contract';

    export default {
    	data() {
    		return {
    			filters: {},
    			options: []
    		};
    	},
    	components: {
    		AddModal,
    		NewContract
    	},
    	methods: {
    		create(type) {
    			this.show_new_house_modal = true;
    		},
    		createContract() {
    			this.show_new_contract_modal = true;
    		}
    	}
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

