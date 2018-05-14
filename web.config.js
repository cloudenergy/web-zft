const port = process.env.ZFT_BLADE_PORT || 8081;
const publicPath = process.env.ZFT_PUBLIC_PATH || '/';

module.exports = {
	proxy: {
		'/api': {
			target:
				process.env['ZFT_BACKEND_PROXY'] ||
				'https://api.51dianxiaoge.com',
			pathRewrite: {
				'^/api': ''
			},
			changeOrigin: true
		}
	},
	// options: mobile|pc|hybrid
	type: 'pc',
	framework: 'vue',
	title: '电小鸽',
	layout: { main: '~/components/app.vue' },
	routes: {
		// 'papers-details': "/:id"
	},
	port,
	build: {
		publicPath
	},
	// 全局 import less
	resources: 'static/less/base.less',
	plugins: {
		global: '~/plugins/all',
		route: '~/plugins/route'
	},
	vuex: '~/plugins/store',
	router: {
		base: '/'
	},
	vendors: ['element-ui'],
	/**
	 * 域名，公众号，公共配置地址，
	 * 只能为字符串的键值对
	 * @type {Object}
	 */
	env: {
		default: {}
	}
};
