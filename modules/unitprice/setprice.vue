<template>
    <div>
        <div class="flexc">
            <el-input v-model="input" placeholder="请输入修改价格" style="width:80%" type="number" @input="upddateValue"></el-input>
            &nbsp;&nbsp;&nbsp;
            <span style="line-height:28px;display:inline-block">元/度</span>
        </div>

        <div class="prompting">(价格调整后，新的价格设置只影响未来的计算费用，对已有数据不产生影响)</div>
    </div>
</template>

<script>
const calc = require('calculatorjs');
export default {
	props: {
		item: {
			required: true
		}
	},
	data() {
		return {
			input: ''
		};
	},
	methods: {
		sendchange() {
			let regPos = /^\d+(\.\d+)?$/; //非负浮点数
			let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
			if (
				regPos.test(this.input) ||
				regNeg.test(this.input) ||
				this.input > 0
			) {
				this.input = this.input * 100;
				this.$emit('notclose', this.input);
				this.input = '';
			} else {
				this.$message('输入错误');
			}
		},
		upddateValue(value) {
			var formattedValue = value
				// 删除两侧的空格符
				.trim()
				// 保留 2 位小数
				.slice(
					0,
					value.indexOf('.') === -1
						? value.length
						: value.indexOf('.') + 3
				);
			// 如果值尚不合规，则手动覆盖为合规的值
			if (formattedValue !== value) {
				this.$nextTick(() => {
					this.input = formattedValue;
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.prompting {
	color: #aaa;
	font-size: 12px;
	margin-top: 3px;
}
</style>