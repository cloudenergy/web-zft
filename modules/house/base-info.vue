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
        <div class="group">
            <el-form-item label="城市">
                <el-select v-model="form.city" size="mini" clearable placeholder="请选择城市">
                    <el-option v-for="item in options.city" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域">
                <el-select v-model="form.city" size="mini" clearable placeholder="请选择区域">
                    <el-option v-for="item in options.area" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <slot />
        </div>
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