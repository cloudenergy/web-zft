<template>
    <div class="group">
        <el-form-item label="户型">
            <div class="inputs">
                <el-input v-model="houseType.bedRoom">
                    <template slot="append">室</template>
                </el-input>
                <el-input v-model="houseType.livingRoom">
                    <template slot="append">厅</template>
                </el-input>
                <el-input v-model="houseType.bathRoom">
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
    		},
    		houseType: {
    			type: Object,
    			default() {
    				return {
    					bedRoom: 2,
    					livingRoom: 1,
    					bathRoom: 1
    				};
    			}
    		}
    	},
    	watch: {
    		form(val) {
    			this.$emit('input', val);
    			console.log('val: ', val);
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

