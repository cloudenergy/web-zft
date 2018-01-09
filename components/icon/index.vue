<script>
    export default {
    	props: ['type', 'size'],
    	render() {
    		const data = {
    			class: this.type ? 'icon-' + this.type : ''
    		};
    		return <i class="iconfont" {...data} />;
    	}
    };
</script>

<style lang="less" scoped>
    @import './icon.less';
    @font-face {
    	font-family: 'iconfont';
    	src: url('./fonts/iconfont.eot'); /* IE9*/
    	src: url('./fonts/iconfont.eot#iefix') format('embedded-opentype'),
    		url('./fonts/iconfont.ttf') format('truetype'),
    		url('./fonts/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
    	font-family: 'iconfont' !important;
    	font-size: 12px;
    	font-style: normal;
    	-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
    }
</style>

