<template>
    <div class="wrapper">
        <div class="group">
            <rent-type-select v-model="form.rentType"></rent-type-select>
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
        <city-area :isForm="true" class="group" />
    </div>
</template>

<script>
    export default {
    	props: {
    		form: {
    			type: Object,
    			default() {
    				return {
    					rentType: '1'
    				};
    			}
    		}
    	},
    	data() {
    		return {
    			options: {
    				city: [],
    				area: []
    			}
    		};
    	}
    };
</script>