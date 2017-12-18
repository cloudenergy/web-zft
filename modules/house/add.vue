<template>
    <div class="add-house-form">
        <el-form :model="form" class="mini-form">
            <h3>房源信息</h3>
            <base-info @change="mergeBaseInfo" :form="form">
            </base-info>
            <div class="group">
                <el-input v-model="form.community" class="full" auto-complete="off">
                    <template slot="prepend">小区</template>
                </el-input>
            </div>
            <div class="group">
                <el-input v-model="form.location.address" auto-complete="off">
                    <template slot="prepend">地址</template>
                </el-input>
                <el-input v-model="form.layout.name" auto-complete="off">
                    <template slot="prepend">名称</template>
                </el-input>
            </div>
            <room-layout v-model="form.layout" :rentType="form.houseFormat"></room-layout>
            <building-floor v-if="form.houseFormat==houseTypes.ENTIRE[0]"></building-floor>
            <div class="group">
                <el-input v-model.number="form.layout.roomArea" auto-complete="off" placeholder="面积">
                    <template slot="prepend">面积</template>
                </el-input>
                <el-input v-model.number="form.currentFloor" auto-complete="off" placeholder="层高">
                    <template slot="prepend">层高</template>
                </el-input>
                <el-input v-model.number="form.totalFloor" auto-complete="off" placeholder="总层数">
                    <template slot="prepend">总层数</template>
                </el-input>
            </div>
            <h3>房源配置</h3>
            <house-facility class="checkboxes" v-model="form.config"></house-facility>
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
    	computed: {
    		...mapState(['houseTypes', 'user'])
    	},
    	data() {
    		return {
    			layouts: [],
    			form: {
    				group: '一期/君临阁',
    				building: '一幢',
    				unit: '1单元',
    				roomNumber: 2301,
    				location: {
    					id: 'B0FFFM44SM',
    					divisionId: 330102,
    					name: '新帝朗郡',
    					district: '浙江省杭州市西湖区',
    					address: '钱江路555号',
    					latitude: 120.195213,
    					longitude: 30.235099
    				},
    				layout: {
    					name: ''
    				},
    				houseFormat: 'SHARE'
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
    			this.$model('houses').create(data, {
    				projectId: this.user.projectId
    			});
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

