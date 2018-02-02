<template>
<i>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="icon"></use>
    </svg>
</i>
</template>

<script>
require('./iconfont.js');
export default {
	props: ['type', 'size'],
	// render() {
	// 	const data = {
	// 		class: this.type ? 'icon-' + this.type : ''
	// 	};

	// }
	computed: {
		icon() {
			return '#icon-' + this.type;
		}
	}
};
</script>

<style lang="less" scoped>
// @import './icon.less';
// @font-face {
// 	font-family: 'iconfont';
// 	src: url('./fonts/iconfont.eot'); /* IE9*/
// 	src: url('./fonts/iconfont.eot#iefix') format('embedded-opentype'),
// 		url('./fonts/iconfont.ttf') format('truetype'),
// 		url('./fonts/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
// }

// .iconfont {
// 	font-family: 'iconfont' !important;
// 	font-size: 12px;
// 	font-style: normal;
// 	-webkit-font-smoothing: antialiased;
// 	-moz-osx-font-smoothing: grayscale;
// }

i {
	position: relative;
	height: 20px;
	width: 20px;
	display: inline-block;
	vertical-align: middle;
	svg {
		position: absolute;
		top: 0px;
		left: 0px;
		height: 18px;
		width: 18px;
	}
}

.iconfont {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
