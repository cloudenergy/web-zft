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
            <el-input v-model="form.orientation" placeholder="方位">
            </el-input>
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
    					bathRoom: 1
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

