<script>
    const defaultLayout = ['login', 'notFound'];
    import _ from 'lodash';
	import browserPrompt from './browserPrompt.vue'
    export default {
		components: {
			browserPrompt
		},
    	data() {
    		return {
    			loading: true
    		};
    	},
    	render() {
    		const matched = this.$route.matched;
			const last = matched[matched.length - 1];
			const userAgent = navigator.userAgent;
			const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; 
			const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
			const isFF = userAgent.indexOf("Firefox") > -1;  
			
			// 浏览器判断
			if(!(isChrome||isSafari||isFF)) {
				return <browserPrompt/>
			}
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
    	},
    	created() {
    		// read cookie or storage
    		_.isUndefined(this.$store.state.user.auth) ? this.stubLogin() : '';
    	},
    	methods: {
    		stubLogin() {
    			this.$router.replace('/login');
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .page {
    	width: 100%;
    	height: 100%;
    }
</style>
