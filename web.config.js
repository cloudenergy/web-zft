module.exports = {
	proxy: {
		'/api': {
			target:
				'http://mock.doctorwork.com/mock/5a0e40653dea15470360bc0b/zft',
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
