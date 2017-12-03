<template>
    <div class="add-house-form">
        <el-form :model="form" class="mini-form">
            <h3>房源信息</h3>
            <base-info @change="mergeBaseInfo"></base-info>
            <div class="group">
                <el-form-item label="地址">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </div>
            <room-layout></room-layout>
            <building-floor v-if="form.rentType==3"></building-floor>
            <h3>房源配置</h3>
            <house-facility class="checkboxes" v-model="form.facilities"></house-facility>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dismiss()">取 消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
        </div>
    </div>
</template>

<script>
    import BaseInfo from './base-info';
    export default {
    	data() {
    		return {
    			form: {
    				rentType: 1,
    				belongs: '',
    				type: []
    			}
    		};
    	},
    	components: {
    		BaseInfo
    	},
    	methods: {
    		mergeBaseInfo(val) {
    			Object.assign(this.form, val);
    		},
    		dismiss() {
    			this.$modal.$emit('dismiss');
    		},
    		save() {
    			this.$modal.$emit('dismiss');
    		}
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

