<script>
const defaultLayout = ['login', 'mobile-login', 'mobile-recharge', 'notFound', 'upgrade'];
import fp from 'lodash/fp';
export default {
	data() {
		return {
			loading: true
		};
	},
	render() {
		const matched = this.$route.matched;
		const last = fp.last(matched);

		console.log(last);
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
};
</script>

<style lang="less" scoped>
.page {
	width: 100%;
	height: 100%;
}
</style>
