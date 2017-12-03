<template>
    <el-dialog :visible.sync="visible">
        test
    </el-dialog>
</template>

<script>
    export default {
    	data() {
    		return {
    			visible: false
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
    		open(comp) {
    			this.visible = true;
    			console.log('comp: ', comp);
    		}
    	}
    };
</script>