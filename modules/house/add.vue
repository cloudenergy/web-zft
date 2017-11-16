<template>
    <el-dialog title="房源信息" :visible="true">
        <el-form :model="form" class="mini-form">
            <div class="group">
                <el-form-item label="方式">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理">
                    <el-select v-model="form.region" placeholder="管理">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="group">
                <el-form-item label="城市">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="区域">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </div>
            <div class="group">
                <el-form-item label="地址">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="close()">确 定</el-button>
        </div>
    </el-dialog>
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

