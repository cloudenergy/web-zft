<template>
    <el-dialog title="房源信息">
        <el-form :model="form" class="mini-form">
            <h3>房源信息</h3>
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
            <h3>房源配置</h3>
            <div class="config checkboxes">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="全选" name="type"></el-checkbox>
                    <el-checkbox label="WIFI" name="type"></el-checkbox>
                    <el-checkbox label="油烟机" name="type"></el-checkbox>
                    <el-checkbox label="停车位" name="type"></el-checkbox>
                    <el-checkbox label="空调" name="type"></el-checkbox>
                    <el-checkbox label="阳台" name="type"></el-checkbox>
                    <el-checkbox label="煤气" name="type"></el-checkbox>
                    <el-checkbox label="游泳池" name="type"></el-checkbox>
                </el-checkbox-group>
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

    .el-form {
    	h3 {
    		margin-bottom: 20px;
    	}

    	.el-checkbox-group {
    		width: 100%;
    	}

    	.checkboxes {
    		display: flex;
    		flex-wrap: wrap;
    		justify-content: space-between;

    		.el-checkbox {
    			width: 20%;
    			margin-left: 0px;
    		}
    	}
    }
</style>

