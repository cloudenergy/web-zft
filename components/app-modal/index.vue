<template>
    <el-dialog :visible.sync="visible" :title="title">
        <div :is="body" ref="body"></div>
    </el-dialog>
</template>

<script>
    export default {
    	data() {
    		return {
    			visible: false,
    			body: null,
    			title: ''
    		};
    	},
    	created() {
    		// 检测 modal事件
    		this.$modal.$on('dismiss', () => this.dismiss());
    		this.$modal.$on('open', data => this.open(data));
    	},
    	methods: {
    		dismiss: function() {
    			this.visible = false;
    		},
    		submit() {
    			this.$refs.body.$emit('submit');
    		},
    		open({ comp, title }) {
    			this.visible = true;
    			this.body = comp;
    			this.title = title;
    		}
    	}
    };
</script>