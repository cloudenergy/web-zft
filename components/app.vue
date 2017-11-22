<script>
    const defaultLayout = ['login', 'notFound'];

    export default {
    	data() {
    		return {
    			loading: true
    		};
    	},
    	render() {
    		const matched = this.$route.matched;
    		const last = matched[matched.length - 1];

    		if (!last) {
    			return <div class="page" v-loading="loading" />;
    		}

    		if (last.name && ~defaultLayout.indexOf(last.name)) {
    			return <router-view />;
    		}

    		return (
    			<app>
    				<router-view />
    			</app>
    		);
    	}
    };
</script>

<style lang="less" scoped>
    .page {
    	width: 100%;
    	height: 100%;
    }
</style>
