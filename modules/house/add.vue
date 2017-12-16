<template>
    <div class="add-house-form">
        <el-form :model="form" class="mini-form">
            <h3>房源信息</h3>
            <base-info @change="mergeBaseInfo">
            </base-info>
            <div class="group">
                <el-input v-model="form.community" class="full" auto-complete="off">
                    <template slot="prepend">小区</template>
                </el-input>
            </div>
            <div class="group">
                <el-input v-model="form.address" auto-complete="off">
                    <template slot="prepend">地址</template>
                </el-input>
                <el-input v-model="form.name" auto-complete="off">
                    <template slot="prepend">名称</template>
                </el-input>
            </div>
            <room-layout v-model="form.houseType[0]"></room-layout>
            <building-floor v-if="form.rentType==3"></building-floor>
            <div class="group">
                <el-form-item label="面积">
                    <el-input v-model="form.size" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="层高">
                    <el-input v-model="form.floor" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.height" auto-complete="off" placeholder="总层数"></el-input>
                </el-form-item>
            </div>
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
    import { mapState } from 'vuex';
    export default {
    	props: {
    		item: {
    			type: Object
    		}
    	},
    	data() {
    		return {
    			form: {
    				address: '',
    				name: '',
    				rentType: 1,
    				belongs: '',
    				type: [],
    				houseType: [{}]
    			}
    		};
    	},
    	components: {
    		BaseInfo
    	},
    	created() {
    		Object.assign(this.form, this.item);
    	},
    	methods: {
    		mergeBaseInfo(val) {
    			Object.assign(this.form, val);
    		},
    		dismiss() {
    			this.$modal.$emit('dismiss');
    		},
    		save() {
    			const data = {
    				projectId: this.$store.state.user.projectId,
    				...this.form
    			};
    			console.log('this form : ', data);
    			// this.$modal.$emit('dismiss');
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

