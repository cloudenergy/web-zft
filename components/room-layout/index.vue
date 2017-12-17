<template>
    <div class="group">
        <div class="inputs">
            <el-input v-model="form.bedRoom">
                <template slot="prepend">户型</template>
                <template slot="append">室</template>
            </el-input>
            <el-input v-model="form.livingRoom">
                <template slot="append">厅</template>
            </el-input>
            <el-input v-model="form.bathRoom">
                <template slot="append">卫</template>
            </el-input>
            <el-select v-model="form.orientation" placeholder="方位">
                <el-option value="E" label="东">东</el-option>
                <el-option value="S" label="南">南</el-option>
                <el-option value="W" label="西">西</el-option>
                <el-option value="N" label="北">北</el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
    	props: {
    		rentType: {
    			type: null
    		},
    		value: {
    			type: Object,
    			default() {
    				return {
    					bedRoom: 2,
    					livingRoom: 1,
    					bathRoom: 1,
    					orientation: 'N'
    				};
    			}
    		}
    	},
    	created() {
    		this.form = this.value;
    	},
    	data() {
    		return {
    			form: {}
    		};
    	},
    	watch: {
    		form(val) {
    			this.$emit('input', val);
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .inputs {
    	display: flex;

    	.el-input {
    		width: 24%;
    		margin: 2px 10px 2px 0px;
    	}
    }
</style>

