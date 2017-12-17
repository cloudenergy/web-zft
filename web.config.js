const port = process.env.ZFT_BLADE_PORT || 8080;
module.exports = {
	proxy: {
		'/api': {
			target:
				process.env['ZFT_BACKEND_PROXY'] ||
				'http://testzft.cloudenergy.me/api',
			pathRewrite: {
				'^/api': ''
			},
			changeOrigin: true
		}
	},
	// options: mobile|pc|hybrid
	type: 'pc',
	framework: 'vue',
	title: '租付通',
	layout: { main: '~/components/app.vue' },
	routes: {
		// 'papers-details': "/:id"
	},
	port,
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
