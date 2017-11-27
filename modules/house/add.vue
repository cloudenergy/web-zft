<template>
    <el-form :model="form" class="mini-form">
        <h3>房源信息</h3>
        <base-info @change="mergeBaseInfo"></base-info>
        <div class="group">
            <el-form-item label="地址">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </div>
        <h3>房源配置</h3>
        <house-facility class="checkboxes" v-model="form.facilities"></house-facility>
    </el-form>
</template>

<script>
    import BaseInfo from './base-info';
    export default {
    	data() {
    		return {
    			form: {
    				rentType: '',
    				belongs: '',
    				type: []
    			}
    		};
    	},
    	components: {
    		BaseInfo
    	},
    	methods: {
    		mergeBaseInfo() {}
    	}
    };
</script>

<style lang="less" scoped>
    .dialog-footer {
    	text-align: right;
    }

    .el-form {
    	h3 {
    		margin-bottom: 20px;
    	}

    	.el-checkbox-group {
    		width: 100%;
    	}
    }
</style>

