<template>
    <div class="modal">
        <el-form :model="form" class="v-form" label-width="100px">
            <el-form-item label="房源信息">
                <el-select v-model="form.rentType" placeholder="方式">
                    <el-option label="整租" value="1"></el-option>
                    <el-option label="单间" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房源配置">
                <el-input v-model="form.belongs" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button>取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </div>
    </div>
</template>

<script>
    import Modal from '~/plugins/modal';
    export default {
    	data() {
    		return {
    			form: {
    				rentType: '',
    				belongs: ''
    			}
    		};
    	}
    };
</script>

<style lang="less" scoped>
    .dialog-footer {
    	text-align: right;
    }
</style>

