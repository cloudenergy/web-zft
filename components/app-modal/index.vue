<template>
    <el-dialog :visible.sync="visible" :title="title" :class="className" class="u-modal">
        <div :is="body" ref="body"></div>
    </el-dialog>
</template>

<script>
import Vue from 'vue';
export default {
	data() {
		return {
			visible: false,
			body: null,
			title: '',
			className: ''
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
			this.$modal.$emit('refresh');
		},
		open({ comp, title, data, className }) {
			this.className = className;
			const Comp = comp;
			this.body = {
				render(h) {
					return <Comp {...{ props: data }} />;
				}
			};
			this.visible = true;
			this.title = title;
		}
	}
};
</script>
