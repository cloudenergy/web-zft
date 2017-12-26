<script>
    const defaultLayout = ['login', 'notFound'];
    import _ from 'lodash' ;

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
    	},
		created() {
			_.isUndefined(this.$store.state.user.auth) ?
				this.stubLogin() : noop();
		},
		methods: {
			stubLogin() {
				this.$store.dispatch('POST_LOGIN')
					.then(data => {
						console.log('login successfully', data)
						this.$store.state.user.auth = true;
					})
                    .then(() => this.$store.dispatch('GET_ENVIRONMENTS'))
                    .then(env => _.fromPairs(_.map(env, i => [i.key, i.value])))
					.then(env => _.merge(this.$store.state, env))
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
