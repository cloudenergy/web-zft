<template>
    <div class="group">
        <el-form-item label="户型">
            <div class="inputs">
                <el-input v-model="form.r">
                    <template slot="append">室</template>
                </el-input>
                <el-input v-model="form.l">
                    <template slot="append">厅</template>
                </el-input>
                <el-input v-model="form.b">
                    <template slot="append">卫</template>
                </el-input>
            </div>
        </el-form-item>
    </div>
</template>

<script>
    export default {
    	props: {
    		rentType: {
    			type: Number,
    			default: 1
    		}
    	},
    	computed: {
    		form() {
    			return this.rentType > 1
    				? { r: 1, l: 1, b: 1 }
    				: { r: 2, l: 1, b: 1 };
    		}
    	},
    	watch: {
    		form(val) {
    			this.$emit('input', val);
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .el-form-item .inputs {
    	display: flex;

    	.el-input {
    		width: auto;
    		margin: 2px 10px 2px 0px;
    	}
    }
</style>

